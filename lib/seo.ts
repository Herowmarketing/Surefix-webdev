/*
 * SEO HOOK — Sure-Fix Remodeling
 *
 * Dependency-free per-route head manager for the Vite + wouter SPA.
 * Each page calls `useSeo({...})` once and we:
 *   - set <title>
 *   - upsert <meta name="description"> + robots
 *   - upsert <link rel="canonical">
 *   - upsert Open Graph + Twitter card tags
 *   - inject any number of JSON-LD blocks tagged data-seo="page"
 *     (so previous route's structured data is cleared on each mount)
 *
 * The static index.html still ships sensible defaults so the first paint
 * and non-JS crawlers see a complete head. We just refine per route.
 */
import { useEffect } from 'react';

export const SITE_URL = 'https://surefixremodelinglv.com';
export const SITE_NAME = 'Sure-Fix Remodeling';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/manus-storage/sf-og-share.jpg`;
export const DEFAULT_OG_IMAGE_ALT =
  'Sure-Fix Remodeling — design-build home remodeling in Easton, PA and the Lehigh Valley';

export type SeoStructuredData = Record<string, unknown> | readonly Record<string, unknown>[];

export interface SeoData {
  /** Page-specific title. The hook appends " | Sure-Fix Remodeling" automatically unless `rawTitle` is true. */
  title: string;
  /** Whether to use `title` as-is without appending the site name. */
  rawTitle?: boolean;
  /** Meta description — keep 140-160 chars for snippet preview. */
  description: string;
  /** Path relative to root for canonical/og:url (e.g. "/services/kitchen"). Defaults to current path. */
  path?: string;
  /** Absolute URL of the OG/Twitter image. */
  image?: string;
  /** Alt text for the OG/Twitter image. */
  imageAlt?: string;
  /** OG type — "website", "article", etc. */
  ogType?: 'website' | 'article' | 'profile';
  /** Robots directive override. Defaults to the index/follow allowlist already in index.html. */
  robots?: string;
  /** Article-only metadata (when ogType="article"). */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: readonly string[];
  };
  /** Optional list of JSON-LD blocks to inject (Service, BreadcrumbList, FAQPage, BlogPosting, …). */
  structuredData?: readonly SeoStructuredData[];
}

function upsertMeta(key: 'name' | 'property', value: string, content: string) {
  if (typeof document === 'undefined') return;
  const selector = `meta[${key}="${value}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(key, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  if (typeof document === 'undefined') return;
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = rel;
    document.head.appendChild(tag);
  }
  tag.href = href;
}

function clearPageStructuredData() {
  if (typeof document === 'undefined') return;
  document.head.querySelectorAll('script[data-seo="page"]').forEach((node) => node.remove());
}

function injectStructuredData(blocks: readonly SeoStructuredData[]) {
  if (typeof document === 'undefined') return;
  for (const block of blocks) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'page');
    try {
      script.textContent = JSON.stringify(block);
    } catch {
      continue;
    }
    document.head.appendChild(script);
  }
}

function resolvePath(path: string | undefined): string {
  if (path) return path.startsWith('/') ? path : `/${path}`;
  if (typeof window === 'undefined') return '/';
  return window.location.pathname || '/';
}

export function useSeo(data: SeoData) {
  const {
    title,
    rawTitle,
    description,
    path,
    image = DEFAULT_OG_IMAGE,
    imageAlt = DEFAULT_OG_IMAGE_ALT,
    ogType = 'website',
    robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    article,
    structuredData,
  } = data;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const resolvedTitle = rawTitle ? title : `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${resolvePath(path)}`;

    document.title = resolvedTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots);
    upsertLink('canonical', url);

    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'en_US');
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:title', resolvedTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:image:alt', imageAlt);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', resolvedTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
    upsertMeta('name', 'twitter:image:alt', imageAlt);

    // Article-specific
    if (ogType === 'article' && article) {
      if (article.publishedTime)
        upsertMeta('property', 'article:published_time', article.publishedTime);
      if (article.modifiedTime)
        upsertMeta('property', 'article:modified_time', article.modifiedTime);
      if (article.author) upsertMeta('property', 'article:author', article.author);
      if (article.section) upsertMeta('property', 'article:section', article.section);
      if (article.tags?.length) {
        // Strip any previous article:tag entries to avoid stale tags from another post
        document.head
          .querySelectorAll('meta[property="article:tag"]')
          .forEach((el) => el.remove());
        for (const tag of article.tags) {
          const tagEl = document.createElement('meta');
          tagEl.setAttribute('property', 'article:tag');
          tagEl.setAttribute('content', tag);
          document.head.appendChild(tagEl);
        }
      }
    } else {
      // Clean up article tags when navigating to a non-article page
      document.head
        .querySelectorAll(
          'meta[property="article:published_time"], meta[property="article:modified_time"], meta[property="article:author"], meta[property="article:section"], meta[property="article:tag"]',
        )
        .forEach((el) => el.remove());
    }

    clearPageStructuredData();
    if (structuredData?.length) injectStructuredData(structuredData);
  }, [
    title,
    rawTitle,
    description,
    path,
    image,
    imageAlt,
    ogType,
    robots,
    article,
    structuredData,
  ]);
}

/* ───────────────────────── Schema.org builders ───────────────────────── */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function breadcrumbList(
  crumbs: readonly { name: string; path: string }[],
): SeoStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  slug: string;
  description: string;
  image?: string;
  areaServed?: readonly string[];
  serviceType?: string;
}): SeoStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    serviceType: input.serviceType ?? input.name,
    description: input.description,
    image: input.image,
    url: `${SITE_URL}${input.slug}`,
    provider: { '@id': LOCAL_BUSINESS_ID },
    areaServed: (input.areaServed ?? [
      'Easton, PA',
      'Bethlehem, PA',
      'Allentown, PA',
      'Coopersburg, PA',
      'Center Valley, PA',
      'Phillipsburg, NJ',
      'Hackettstown, NJ',
      'Washington, NJ',
    ]).map((name) => ({ '@type': 'City', name })),
  };
}

export function faqSchema(items: readonly { q: string; a: string }[]): SeoStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function blogPostingSchema(input: {
  headline: string;
  slug: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  categories?: readonly string[];
}): SeoStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.headline,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: input.author ? { '@type': 'Person', name: input.author } : undefined,
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${input.slug}`,
    },
    keywords: input.categories?.join(', '),
  };
}

export function reviewAggregateSchema(input: {
  ratingValue: number;
  reviewCount: number;
}): SeoStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: { '@id': LOCAL_BUSINESS_ID },
    ratingValue: input.ratingValue,
    reviewCount: input.reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
}
