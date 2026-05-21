/*
 * FOOTER — Sure-Fix Remodeling
 * Light theme: white surface, brand blue/red accents
 */
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { LOGO_URL, BUSINESS } from '@/lib/constants';
import { useLeadStepper } from '@/contexts/LeadStepperContext';

const SERVICE_LINKS = [
  { label: 'Kitchen Remodeling', href: '/services/kitchen' },
  { label: 'Bathroom Renovation', href: '/services/bathroom' },
  { label: 'Basement Finishing', href: '/services/basement' },
  { label: 'Exterior Remodeling', href: '/services/exterior' },
  { label: 'Home Additions', href: '/services/additions' },
  { label: 'Flooring & Tile', href: '/services/flooring' },
];

const AREAS: { label: string; href: string }[] = [
  { label: 'Easton, PA', href: '/locations/easton-pa' },
  { label: 'Bethlehem, PA', href: '/locations/bethlehem-pa' },
  { label: 'Allentown, PA', href: '/locations/allentown-pa' },
  { label: 'Coopersburg, PA', href: '/locations/coopersburg-pa' },
  { label: 'Center Valley, PA', href: '/locations/center-valley-pa' },
  { label: 'Phillipsburg, NJ', href: '/locations/phillipsburg-nj' },
  { label: 'Hackettstown, NJ', href: '/locations/hackettstown-nj' },
  { label: 'Washington, NJ', href: '/locations/washington-nj' },
];

export default function Footer() {
  const { openStepper } = useLeadStepper();
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600" style={{ fontFamily: 'Figtree, sans-serif' }}>
      <div className="h-px bg-gradient-to-r from-transparent via-[#394696]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 pb-[max(4rem,calc(3rem+env(safe-area-inset-bottom,0px)))] pt-14 min-[400px]:px-5 lg:px-8 lg:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Link href="/">
                <img
                  src={LOGO_URL}
                  alt="Sure-Fix Remodeling"
                  className="h-14 object-contain cursor-pointer"
                />
              </Link>
            </div>
            <p className="text-sm leading-relaxed mb-5 text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
              Modernizing forever homes across Easton, PA and the Greater Lehigh Valley — full-service design-build for aging-in-place, additions, and whole-home transformations. Family-run and trusted since 2008.
            </p>
            <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link href="/promotions" className="text-[#983631] transition-colors hover:text-[#7a2a26]">
                Promotions
              </Link>
              <Link href="/publications" className="text-[#394696] transition-colors hover:text-[#2a3578]">
                Publications &amp; blog
              </Link>
              <Link href="/locations" className="text-slate-600 transition-colors hover:text-slate-900">
                Locations
              </Link>
              <Link href="/about" className="text-slate-600 transition-colors hover:text-slate-900">
                About
              </Link>
              <Link href="/reviews" className="text-slate-600 transition-colors hover:text-slate-900">
                Reviews
              </Link>
            </div>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: BUSINESS.social.facebook, label: 'Facebook' },
                { icon: Instagram, href: BUSINESS.social.instagram, label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-200 hover:scale-110 hover:border-[#394696] hover:bg-[#394696] hover:text-white [-webkit-tap-highlight-color:transparent]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map(s => (
                <li key={s.label}>
                  <Link href={s.href}>
                    <span className="text-sm text-slate-600 hover:text-[#394696] transition-colors cursor-pointer">{s.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-5">Service Areas</h4>
            <ul className="space-y-2.5">
              {AREAS.map(a => (
                <li key={a.label}>
                  <Link href={a.href}>
                    <span className="text-sm text-slate-600 hover:text-[#394696] transition-colors cursor-pointer">{a.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-5">Contact</h4>
            <div className="space-y-3 mb-6">
              <a href={BUSINESS.phoneHref} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                <Phone size={13} className="text-[#983631]" /> {BUSINESS.phone}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                <Mail size={13} className="text-[#983631]" /> {BUSINESS.email}
              </a>
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <MapPin size={13} className="text-[#983631] mt-0.5 flex-shrink-0" />
                <span>{BUSINESS.address}<br />Serving PA, NJ & NY</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openStepper()}
              className="flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-xs font-black uppercase tracking-wider text-white sm:w-auto [-webkit-tap-highlight-color:transparent]"
              style={{ background: '#983631', border: 'none' }}
            >
              Free Estimate <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom,0px)+0.5rem)] bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 min-[400px]:px-5 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sure-Fix Remodeling LLC. All rights reserved.</p>
          <p>Licensed & Insured · Serving PA, NJ & NY</p>
        </div>
        <p className="mt-3 text-center text-[10px] tracking-wide text-slate-400">
          Website created by{' '}
          <a
            href="https://herowmarketing.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition-colors hover:text-[#394696]"
          >
            Herow Marketing
          </a>
        </p>
      </div>
    </footer>
  );
}
