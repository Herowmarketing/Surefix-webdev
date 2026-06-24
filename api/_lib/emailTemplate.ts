/**
 * Branded HTML email templates for Sure-Fix Remodeling.
 *
 * Table-based, inline-styled markup for broad email-client compatibility
 * (Gmail, Apple Mail, Outlook). Brand palette mirrors the website:
 *   French Blue  #394696   ·   Brown Red  #983631   ·   ink  #1f2937
 *
 * Server-side only — used by the API handlers when notifying prospects.
 */

const BRAND = {
  name: 'Sure-Fix Remodeling',
  navy: '#394696',
  red: '#983631',
  ink: '#1f2937',
  muted: '#64748b',
  line: '#e2e8f0',
  bg: '#f1f5f9',
  site: 'https://surefixremodelinglv.com',
  logo: 'https://surefixremodelinglv.com/manus-storage/sf-logo-email.png',
  phone: '(610) 392-0990',
  phoneHref: 'tel:6103920990',
  email: 'info@surefixremodeling.net',
  address: '2015 Freemansburg Ave, Easton, PA 18042',
  hours: 'Mon–Fri 8AM–7PM · Sat 8AM–4PM · Sun Closed',
  facebook: 'https://www.facebook.com/surefixremodeling',
  instagram: 'https://www.instagram.com/surefixremodeling',
};

export type DetailRow = { label: string; value?: string | null };

export interface BrandedEmailOptions {
  /** Hidden inbox-preview text. */
  preheader: string;
  /** Main heading (e.g. "Thanks, Jordan!"). */
  heading: string;
  /** Body paragraphs rendered in order. */
  paragraphs: string[];
  /** Optional highlighted summary box. */
  highlightTitle?: string;
  highlightRows?: DetailRow[];
  /** Optional call-to-action button. */
  ctaLabel?: string;
  ctaHref?: string;
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

/** Build a fully branded HTML email body. */
export function renderBrandedEmail(opts: BrandedEmailOptions): string {
  const paragraphs = opts.paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-family:${FONT};font-size:15px;line-height:1.65;color:${BRAND.ink};">${p}</p>`,
    )
    .join('');

  const rows = (opts.highlightRows ?? []).filter((r) => r.value);
  const highlight =
    opts.highlightTitle && rows.length
      ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;border:1px solid ${BRAND.line};border-radius:12px;background:#f8fafc;">
        <tr><td style="padding:18px 20px;">
          <p style="margin:0 0 12px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND.navy};">${esc(opts.highlightTitle)}</p>
          ${rows
            .map(
              (r) =>
                `<p style="margin:0 0 6px;font-family:${FONT};font-size:14px;line-height:1.5;color:${BRAND.ink};"><span style="color:${BRAND.muted};">${esc(r.label)}:</span> <strong>${esc(String(r.value))}</strong></p>`,
            )
            .join('')}
        </td></tr>
      </table>`
      : '';

  const cta =
    opts.ctaLabel && opts.ctaHref
      ? `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 28px;">
        <tr><td style="border-radius:10px;background:${BRAND.red};">
          <a href="${esc(opts.ctaHref)}" style="display:inline-block;padding:14px 30px;font-family:${FONT};font-size:13px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#ffffff;text-decoration:none;border-radius:10px;">${esc(opts.ctaLabel)}</a>
        </td></tr>
      </table>`
      : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <title>${esc(BRAND.name)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};">
  <span style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">${esc(opts.preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(15,23,42,0.08);">

        <!-- Logo header -->
        <tr><td align="center" style="padding:32px 24px 20px;">
          <img src="${BRAND.logo}" width="180" alt="${esc(BRAND.name)}" style="display:block;width:180px;max-width:60%;height:auto;border:0;" />
        </td></tr>

        <!-- Accent bar -->
        <tr><td style="height:4px;line-height:4px;font-size:0;background:${BRAND.navy};">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="height:4px;background:${BRAND.navy};">&nbsp;</td>
            <td style="height:4px;background:${BRAND.red};">&nbsp;</td>
          </tr></table>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:30px 36px 8px;">
          <h1 style="margin:0 0 18px;font-family:${FONT};font-size:24px;line-height:1.25;font-weight:800;color:${BRAND.ink};">${esc(opts.heading)}</h1>
          ${paragraphs}
          ${highlight}
          ${cta}
        </td></tr>

        <!-- Contact strip -->
        <tr><td style="padding:8px 36px 4px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BRAND.line};">
            <tr><td style="padding-top:20px;">
              <p style="margin:0 0 6px;font-family:${FONT};font-size:14px;color:${BRAND.ink};">
                <a href="${BRAND.phoneHref}" style="color:${BRAND.navy};text-decoration:none;font-weight:700;">${esc(BRAND.phone)}</a>
                &nbsp;·&nbsp;
                <a href="mailto:${BRAND.email}" style="color:${BRAND.navy};text-decoration:none;">${esc(BRAND.email)}</a>
              </p>
              <p style="margin:0 0 4px;font-family:${FONT};font-size:13px;color:${BRAND.muted};">${esc(BRAND.address)}</p>
              <p style="margin:0;font-family:${FONT};font-size:13px;color:${BRAND.muted};">${esc(BRAND.hours)}</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 36px 32px;">
          <p style="margin:0 0 8px;font-family:${FONT};font-size:12px;color:${BRAND.muted};">
            <a href="${BRAND.facebook}" style="color:${BRAND.navy};text-decoration:none;">Facebook</a>
            &nbsp;·&nbsp;
            <a href="${BRAND.instagram}" style="color:${BRAND.navy};text-decoration:none;">Instagram</a>
            &nbsp;·&nbsp;
            <a href="${BRAND.site}" style="color:${BRAND.navy};text-decoration:none;">surefixremodelinglv.com</a>
          </p>
          <p style="margin:0;font-family:${FONT};font-size:11px;line-height:1.5;color:#94a3b8;">
            © ${new Date().getFullYear()} ${esc(BRAND.name)} LLC · Family-run &amp; trusted since 2008 · Licensed &amp; Insured · Serving PA, NJ &amp; NY
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Plain-text fallback mirroring the branded email. */
export function renderBrandedText(opts: BrandedEmailOptions): string {
  const rows = (opts.highlightRows ?? [])
    .filter((r) => r.value)
    .map((r) => `  ${r.label}: ${r.value}`)
    .join('\n');
  return [
    opts.heading,
    '',
    opts.paragraphs.join('\n\n'),
    opts.highlightTitle && rows ? `\n${opts.highlightTitle}:\n${rows}` : '',
    opts.ctaLabel && opts.ctaHref ? `\n${opts.ctaLabel}: ${opts.ctaHref}` : '',
    '',
    `${BRAND.name}`,
    `${BRAND.phone} · ${BRAND.email}`,
    `${BRAND.address}`,
    `${BRAND.hours}`,
    `${BRAND.site}`,
  ]
    .filter(Boolean)
    .join('\n');
}
