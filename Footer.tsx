/*
 * FOOTER — Sure-Fix Remodeling
 * Design: Deep dark bg, 4-column layout, real logo, real phone, page links
 * Colours: #0d1117 bg, brand blue/red accents
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

const AREAS = ['Easton, PA', 'Bethlehem, PA', 'Allentown, PA', 'Phillipsburg, NJ', 'Hackettstown, NJ', 'Washington, NJ'];

export default function Footer() {
  const { openStepper } = useLeadStepper();
  return (
    <footer className="bg-[#0d1117] text-white/45" style={{ fontFamily: 'Figtree, sans-serif' }}>
      {/* Top gradient accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#394696]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
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
            <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: 'Georgia, serif' }}>
              Premium home renovation services in Easton, PA and the Greater Lehigh Valley. Family-run and trusted since 2008.
            </p>
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
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#394696')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                >
                  <Icon size={15} className="text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map(s => (
                <li key={s.label}>
                  <Link href={s.href}>
                    <span className="text-sm hover:text-white transition-colors cursor-pointer">{s.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-widest mb-5">Service Areas</h4>
            <ul className="space-y-2.5">
              {AREAS.map(a => (
                <li key={a} className="text-sm">{a}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-widest mb-5">Contact</h4>
            <div className="space-y-3 mb-6">
              <a href={BUSINESS.phoneHref} className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Phone size={13} className="text-[#983631]" /> {BUSINESS.phone}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Mail size={13} className="text-[#983631]" /> {BUSINESS.email}
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={13} className="text-[#983631] mt-0.5 flex-shrink-0" />
                <span>{BUSINESS.address}<br />Serving PA, NJ & NY</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openStepper()}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black text-white cursor-pointer uppercase tracking-wider w-full"
              style={{ background: '#983631', border: 'none' }}
            >
              Free Estimate <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Sure-Fix Remodeling LLC. All rights reserved.</p>
          <p>Licensed & Insured · Serving PA, NJ & NY</p>
        </div>
      </div>
    </footer>
  );
}
