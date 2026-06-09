/* eslint-disable no-console */
/*
 * PRERENDER — Sure-Fix Remodeling
 *
 * Post-`vite build` step that produces static HTML for every known route.
 * Strategy: serve dist/ on a local port, drive headless Chrome through each
 * route, wait for the useSeo hook to inject <script data-seo="page">, then
 * snapshot document.documentElement.outerHTML to dist/<route>/index.html.
 *
 * Result: every route ships its own <title>, meta description, canonical,
 * Open Graph, Twitter card, and JSON-LD on the first byte — so Google,
 * Bing, GPTBot, ClaudeBot, PerplexityBot, link unfurlers, etc. see the
 * fully populated head without executing JavaScript.
 *
 * Blog post slugs come from Sanity at build time via a direct GROQ fetch.
 * If Sanity is unreachable we skip blog posts and log a warning rather
 * than failing the build.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/*
 * Browser binary resolution:
 *   - On Vercel / AWS Lambda (Linux serverless containers) the Puppeteer-
 *     bundled Chromium is missing system libs (libnspr4.so, libnss3, etc).
 *     We use @sparticuz/chromium which ships a Chromium binary built
 *     specifically for Amazon Linux serverless environments, driven by
 *     puppeteer-core (no auto-downloaded Chrome).
 *   - On every other environment (local macOS/Linux dev) we use the full
 *     puppeteer package whose post-install hook downloads its own Chromium.
 */
const IS_SERVERLESS = process.env.VERCEL === '1' || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

const puppeteer = IS_SERVERLESS
  ? (await import('puppeteer-core')).default
  : (await import('puppeteer')).default;

const sparticuzChromium = IS_SERVERLESS
  ? (await import('@sparticuz/chromium')).default
  : null;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PORT = Number.parseInt(process.env.PRERENDER_PORT ?? '4180', 10);
/** Public origin baked into OG/Twitter asset URLs — must never be 127.0.0.1 (link unfurlers cannot fetch it). */
const CANONICAL_ORIGIN =
  process.env.PRERENDER_ORIGIN ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
  process.env.SITE_URL ??
  'https://surefixremodelinglv.com';

const SANITY_PROJECT_ID = 'kqp67u17';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

/* ─────────────────────────── ROUTE ENUMERATION ─────────────────────────── */

const STATIC_ROUTES = [
  '/',
  '/services',
  '/services/kitchen',
  '/services/bathroom',
  '/services/basement',
  '/services/exterior',
  '/services/flooring',
  '/services/additions',
  '/about',
  '/contact',
  '/reviews',
  '/showroom',
  '/interior-design',
  '/promotions',
  '/publications',
  '/blog',
  '/locations',
];

// Mirrors lib/locations-data.ts — kept in sync manually because this script
// runs at build time and we don't want to compile TS just for the slug list.
const LOCATION_SLUGS = [
  'easton-pa',
  'bethlehem-pa',
  'allentown-pa',
  'coopersburg-pa',
  'center-valley-pa',
  'phillipsburg-nj',
  'hackettstown-nj',
  'washington-nj',
];

// Static blog posts in /publications/blog/:slug (lib/blog-content.ts)
const PUBLICATION_BLOG_SLUGS = [
  'when-repair-turns-remodel',
  'choosing-cabinets-stock-semi-custom-custom',
  'basement-moisture-finishing-first-steps',
];

async function fetchSanityBlogSlugs() {
  const groq = encodeURIComponent(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`,
  );
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${groq}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const slugs = Array.isArray(json?.result)
      ? json.result.map((r) => r?.slug).filter((s) => typeof s === 'string' && s.length > 0)
      : [];
    return slugs;
  } catch (err) {
    console.warn(`  ⚠ Could not reach Sanity for blog slugs: ${err.message}. Skipping /blog/:slug.`);
    return [];
  }
}

/* ─────────────────────────── STATIC FILE SERVER ─────────────────────────── */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

function startStaticServer(rootDir, port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const reqUrl = new URL(req.url, `http://localhost:${port}`);
        let pathname = decodeURIComponent(reqUrl.pathname);
        // SPA fallback — for any non-asset 404, serve index.html so the React
        // app can take over and render the requested route.
        const ext = path.extname(pathname);
        let filePath = path.join(rootDir, pathname);
        if (!ext) {
          // Could be /blog or /blog/, try index.html under that path first
          const candidate = path.join(filePath, 'index.html');
          if (fs.existsSync(candidate)) filePath = candidate;
          else filePath = path.join(rootDir, 'index.html');
        }
        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
          filePath = path.join(rootDir, 'index.html');
        }
        const finalExt = path.extname(filePath);
        const mime = MIME[finalExt] ?? 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'no-store' });
        fs.createReadStream(filePath).pipe(res);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`prerender static server error: ${err.message}`);
      }
    });
    server.listen(port, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

/* ─────────────────────────── HTML SNAPSHOT WRITE ─────────────────────────── */

function routeToFilePath(route) {
  if (route === '/' || route === '') return path.join(DIST, 'index.html');
  const clean = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(DIST, clean, 'index.html');
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/** Replace localhost URLs from the prerender server with the deployment's public HTTPS origin. */
function canonicalizePrerenderHtml(html) {
  const localPattern = new RegExp(
    `https?://(?:127\\.0\\.0\\.1|localhost):${PORT}`,
    'g',
  );
  return html.replace(localPattern, CANONICAL_ORIGIN);
}

/* ─────────────────────────────────── MAIN ─────────────────────────────────── */

async function main() {
  if (!fs.existsSync(DIST)) {
    console.error(`✗ dist/ not found at ${DIST} — run \`vite build\` first.`);
    process.exit(1);
  }

  console.log('› Enumerating routes…');
  const blogSlugs = await fetchSanityBlogSlugs();
  const locationRoutes = LOCATION_SLUGS.map((s) => `/locations/${s}`);
  const publicationBlogRoutes = PUBLICATION_BLOG_SLUGS.map((s) => `/publications/blog/${s}`);
  const sanityBlogRoutes = blogSlugs.map((s) => `/blog/${s}`);
  const routes = [
    ...STATIC_ROUTES,
    ...locationRoutes,
    ...publicationBlogRoutes,
    ...sanityBlogRoutes,
  ];
  console.log(`  ↳ ${routes.length} routes (${blogSlugs.length} Sanity blog posts)`);
  console.log(`  ↳ OG asset origin: ${CANONICAL_ORIGIN}`);

  console.log(`› Starting static server on http://127.0.0.1:${PORT}`);
  const server = await startStaticServer(DIST, PORT);

  console.log(
    `› Launching headless Chrome (${IS_SERVERLESS ? '@sparticuz/chromium' : 'puppeteer bundled'})…`,
  );
  const launchOptions = IS_SERVERLESS
    ? {
        args: [
          ...sparticuzChromium.args,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
        defaultViewport: { width: 1280, height: 800 },
        executablePath: await sparticuzChromium.executablePath(),
        headless: sparticuzChromium.headless,
      }
    : {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        headless: true,
      };
  const browser = await puppeteer.launch(launchOptions);

  const failures = [];
  try {
    const page = await browser.newPage();
    await page.evaluateOnNewDocument((origin) => {
      window.__PRERENDER_ORIGIN__ = origin;
    }, CANONICAL_ORIGIN);
    await page.setViewport({ width: 1280, height: 800 });
    // Skip heavy assets — they slow prerender and we only need DOM/head
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const type = req.resourceType();
      if (type === 'image' || type === 'media' || type === 'font') req.abort();
      else req.continue();
    });

    for (const route of routes) {
      const url = `http://127.0.0.1:${PORT}${route}`;
      const outPath = routeToFilePath(route);
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        // Wait for the useSeo hook to inject its structured data so the snapshot
        // includes per-route JSON-LD, not just the static index.html graph.
        await page.waitForSelector('script[data-seo="page"]', { timeout: 10000 }).catch(() => {});
        const rawHtml = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML);
        const html = canonicalizePrerenderHtml(rawHtml);
        ensureDir(path.dirname(outPath));
        fs.writeFileSync(outPath, html, 'utf8');
        console.log(`  ✓ ${route}`);
      } catch (err) {
        failures.push({ route, error: err.message });
        console.error(`  ✗ ${route} — ${err.message}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (failures.length > 0) {
    console.error(`\n✗ Prerender finished with ${failures.length} failure(s).`);
    process.exit(1);
  }
  console.log(`\n✓ Prerendered ${routes.length} route(s) to dist/.`);
}

main().catch((err) => {
  console.error('Prerender crashed:', err);
  process.exit(1);
});
