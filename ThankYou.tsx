import { useEffect } from 'react';
import { Link } from 'wouter';
import { CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import { BUSINESS, LOGO_URL } from '@/lib/constants';
import { useSeo, breadcrumbList } from '@/lib/seo';
import {
  clearPendingEnhancedConversionUserData,
  getPendingEnhancedConversionUserData,
  GOOGLE_ADS_FORM_CONVERSION,
  trackGoogleAdsConversion,
  trackThankYouConversion,
} from '@/lib/analytics';
import PhoneLink from '@/components/PhoneLink';

export default function ThankYou() {
  const isKitchenPromo =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('source') === 'kitchen-promo-stepper';
  // Fire Google Ads conversions on page load:
  //  1. "Thank You Page Submission" conversion (page-load based).
  //  2. Form-submission conversion — belt-and-suspenders alongside the
  //     trackLeadSubmission() call on the form page (Google de-dupes per click).
  useEffect(() => {
    const userData = getPendingEnhancedConversionUserData();
    trackThankYouConversion(userData);
    trackGoogleAdsConversion(GOOGLE_ADS_FORM_CONVERSION, undefined, userData);
    clearPendingEnhancedConversionUserData();
  }, []);

  useSeo({
    title: 'Thank You — Request Received',
    description:
      'Thank you for contacting Sure-Fix Remodeling. Our team will review your request and follow up shortly.',
    path: '/thank-you',
    robots: 'noindex, follow',
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Thank You', path: '/thank-you' },
      ]),
    ],
  });

  return (
    <main className="min-h-screen bg-white px-5 pt-36 pb-20 lg:px-8">
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <img src={LOGO_URL} alt="Sure-Fix Remodeling" className="mb-8 h-16 w-auto" />
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: 'rgba(57,70,150,0.12)' }}
        >
          <CheckCircle2 size={34} className="text-[#394696]" />
        </div>

        <p
          className="mb-3 text-xs font-black uppercase tracking-[0.32em] text-[#394696]"
          style={{ fontFamily: 'Figtree, sans-serif' }}
        >
          {isKitchenPromo ? 'Kitchen Sale Request Received' : 'Request Received'}
        </p>
        <h1
          className="mb-5 text-4xl font-black leading-tight text-slate-900 sm:text-5xl"
          style={{ fontFamily: 'Figtree, sans-serif' }}
        >
          {isKitchenPromo ? 'Your kitchen savings are noted.' : 'Thanks, we got your request.'}
        </h1>
        <p
          className="mb-9 max-w-xl text-lg leading-relaxed text-slate-600"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {isKitchenPromo
            ? 'Your 10% kitchen discount, up to $2,000, is attached to your request. A Sure-Fix team member will follow up within 24 hours to plan your consultation.'
            : 'A member of the Sure-Fix Remodeling team will review your project details and follow up within 24 hours to talk through next steps.'}
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <PhoneLink
            className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition-opacity hover:opacity-90"
            style={{ background: '#983631', fontFamily: 'Figtree, sans-serif' }}
          >
            <Phone size={15} />
            Call Now: {BUSINESS.phone}
          </PhoneLink>
          <Link href={isKitchenPromo ? '/services/kitchen' : '/services'}>
            <span
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-6 py-4 text-sm font-black uppercase tracking-wider text-slate-900 transition-colors hover:bg-slate-50"
              style={{ fontFamily: 'Figtree, sans-serif' }}
            >
              {isKitchenPromo ? 'Explore Kitchens' : 'Explore Services'} <ArrowRight size={15} />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
