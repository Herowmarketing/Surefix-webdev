export const GA_MEASUREMENT_ID = 'G-RE67MCL4PC';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag(...args);
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
}
