import { type AnchorHTMLAttributes, type ReactNode, useEffect } from 'react';
import { BUSINESS } from '@/lib/constants';
import { initWebsiteCallTracking } from '@/lib/analytics';

type PhoneLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  children?: ReactNode;
  /** Re-run Google call-number swap after this link mounts (SPA menus / late render). */
  refreshCallTracking?: boolean;
};

/**
 * Canonical phone CTA for Google Ads website call tracking.
 * Keeps visible text + tel: href in the format gtag expects, and refreshes
 * number replacement when the link appears after initial page load.
 */
export default function PhoneLink({
  children,
  className,
  refreshCallTracking = true,
  onClick,
  ...rest
}: PhoneLinkProps) {
  useEffect(() => {
    if (!refreshCallTracking) return;
    const id = window.setTimeout(() => initWebsiteCallTracking(), 0);
    return () => window.clearTimeout(id);
  }, [refreshCallTracking]);

  return (
    <a href={BUSINESS.phoneHref} className={className} {...rest} onClick={onClick}>
      {children ?? BUSINESS.phone}
    </a>
  );
}
