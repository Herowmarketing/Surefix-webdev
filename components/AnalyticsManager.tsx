import { useEffect } from 'react';
import { useLocation } from 'wouter';
import {
  captureAttribution,
  trackPageView,
  trackPhoneClick,
  initGoogleAds,
  initWebsiteCallTracking,
} from '@/lib/analytics';

export default function AnalyticsManager() {
  const [location] = useLocation();

  useEffect(() => {
    captureAttribution();
    initGoogleAds();
    initWebsiteCallTracking();
  }, []);

  useEffect(() => {
    captureAttribution();
    trackPageView(location);
    // SPA route changes remount phone CTAs; re-run number swap after paint.
    const id = window.setTimeout(() => initWebsiteCallTracking(), 50);
    return () => window.clearTimeout(id);
  }, [location]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest('a[href^="tel:"]');
      if (!link || !(link instanceof HTMLAnchorElement)) return;

      trackPhoneClick(link.href, window.location.pathname);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
