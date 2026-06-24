export const GA_MEASUREMENT_ID = 'G-RE67MCL4PC';

/** Google Ads conversion ID — defaults to live tag; override via VITE_GOOGLE_ADS_ID if needed */
export const GOOGLE_ADS_ID =
  import.meta.env.VITE_GOOGLE_ADS_ID?.trim() || 'AW-18229674384';

/** Label only (after the /) or full send_to (AW-xxx/label) */
export const GOOGLE_ADS_FORM_CONVERSION =
  import.meta.env.VITE_GOOGLE_ADS_FORM_CONVERSION?.trim() || 'VyfvCPaZxMQcEJCDy_RD';
export const GOOGLE_ADS_PHONE_CONVERSION =
  import.meta.env.VITE_GOOGLE_ADS_PHONE_CONVERSION?.trim() || 'GItgCMrltsQcEJCDy_RD';
/** Thank-you page conversion — fires once on the /thank-you page load. */
export const GOOGLE_ADS_THANKYOU_CONVERSION =
  import.meta.env.VITE_GOOGLE_ADS_THANKYOU_CONVERSION?.trim() || 'VyfvCPaZxMQcEJCDy_RD';

const ATTRIBUTION_STORAGE_KEY = 'sf_attribution';

const ATTRIBUTION_PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'gbraid',
  'wbraid',
  'msclkid',
  'fbclid',
] as const;

export type AttributionPayload = {
  landingPage?: string;
  landingPagePath?: string;
  conversionPage?: string;
  referrer?: string;
  firstSeenAt?: string;
  lastSeenAt?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  msclkid?: string;
  fbclid?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  // Skip analytics/conversions during headless prerendering (build-time). The
  // prerender bot reports navigator.webdriver === true; firing conversion
  // events here opens a persistent tracking iframe that stalls networkidle.
  if (typeof navigator !== 'undefined' && navigator.webdriver) return;
  window.gtag(...args);
}

function safeReadAttribution(): AttributionPayload {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AttributionPayload) : {};
  } catch {
    return {};
  }
}

function safeWriteAttribution(payload: AttributionPayload) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage may be disabled; GA events still fire without persisted attribution.
  }
}

function getParam(search: URLSearchParams, key: (typeof ATTRIBUTION_PARAM_KEYS)[number]) {
  return search.get(key)?.trim() || undefined;
}

function buildAttributionFromLocation(existing: AttributionPayload = {}): AttributionPayload {
  if (typeof window === 'undefined') return existing;

  const now = new Date().toISOString();
  const url = new URL(window.location.href);
  const search = url.searchParams;
  const next: AttributionPayload = {
    ...existing,
    landingPage: existing.landingPage || url.href,
    landingPagePath: existing.landingPagePath || `${url.pathname}${url.search}`,
    conversionPage: url.href,
    referrer: existing.referrer || document.referrer || undefined,
    firstSeenAt: existing.firstSeenAt || now,
    lastSeenAt: now,
  };

  const map: Record<(typeof ATTRIBUTION_PARAM_KEYS)[number], keyof AttributionPayload> = {
    utm_source: 'utmSource',
    utm_medium: 'utmMedium',
    utm_campaign: 'utmCampaign',
    utm_term: 'utmTerm',
    utm_content: 'utmContent',
    gclid: 'gclid',
    gbraid: 'gbraid',
    wbraid: 'wbraid',
    msclkid: 'msclkid',
    fbclid: 'fbclid',
  };

  for (const key of ATTRIBUTION_PARAM_KEYS) {
    const value = getParam(search, key);
    if (value) next[map[key]] = value;
  }

  return next;
}

export function captureAttribution() {
  const attribution = buildAttributionFromLocation(safeReadAttribution());
  safeWriteAttribution(attribution);
  return attribution;
}

export function getAttributionPayload(): AttributionPayload {
  const attribution = buildAttributionFromLocation(safeReadAttribution());
  safeWriteAttribution(attribution);
  return attribution;
}

function resolveSendTo(labelOrSendTo: string): string | null {
  if (!labelOrSendTo) return null;
  if (labelOrSendTo.startsWith('AW-')) return labelOrSendTo;
  if (!GOOGLE_ADS_ID) return null;
  return `${GOOGLE_ADS_ID}/${labelOrSendTo}`;
}

export function initGoogleAds() {
  if (GOOGLE_ADS_ID) {
    gtag('config', GOOGLE_ADS_ID);
  }
}

export function trackGoogleAdsConversion(
  labelOrSendTo: string,
  params?: Record<string, string | number>,
) {
  const sendTo = resolveSendTo(labelOrSendTo);
  if (!sendTo) return;
  gtag('event', 'conversion', { send_to: sendTo, ...params });
}

/** Fire the Thank You Page Submission conversion (page-load based). */
export function trackThankYouConversion() {
  trackGoogleAdsConversion(GOOGLE_ADS_THANKYOU_CONVERSION, { value: 1.0, currency: 'USD' });
}

export function trackPageView(path: string, title?: string) {
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title ?? document.title,
    page_location: `${window.location.origin}${path}`,
  });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  gtag('event', eventName, params);
}

export function trackLeadStepperOpen(service?: string) {
  trackEvent('begin_checkout', {
    item_category: 'lead_stepper',
    item_name: service || 'general',
  });
  trackEvent('form_start', {
    form_name: 'lead_stepper',
    form_destination: service || 'general',
  });
}

export function trackLeadSubmission(input: {
  projectType: string;
  timeline: string;
}) {
  trackEvent('generate_lead', {
    currency: 'USD',
    value: 1,
    lead_type: 'project_inquiry',
    project_type: input.projectType,
    timeline: input.timeline,
  });
  trackEvent('form_submit', {
    form_name: 'lead_stepper',
    project_type: input.projectType,
  });
  trackGoogleAdsConversion(GOOGLE_ADS_FORM_CONVERSION);
}

export function trackCareerApplication(input: {
  position: string;
  isGeneralApplication: boolean;
}) {
  trackEvent('generate_lead', {
    currency: 'USD',
    value: 1,
    lead_type: 'career_application',
    position: input.position,
    application_type: input.isGeneralApplication ? 'general' : 'role_specific',
  });
  trackEvent('form_submit', {
    form_name: 'career_application',
    position: input.position,
  });
}

export function trackPhoneClick(phoneHref: string, pagePath: string) {
  trackEvent('phone_click', {
    link_url: phoneHref,
    page_path: pagePath,
  });
  trackGoogleAdsConversion(GOOGLE_ADS_PHONE_CONVERSION, { value: 1.0, currency: 'USD' });
}
