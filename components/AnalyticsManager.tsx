import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackPageView, trackPhoneClick } from '@/lib/analytics';

export default function AnalyticsManager() {
  const [location] = useLocation();

  useEffect(() => {
    trackPageView(location);
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
