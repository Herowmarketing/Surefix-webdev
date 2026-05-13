/*
 * NAVBAR — Sure-Fix Remodeling
 * Design: Dark glass, sticky, real logo SVG, Services dropdown, mobile hamburger
 * Brand: Deep Navy bg, French Blue accent, Brown Red CTA
 * Real phone: (610) 392-0990
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { LOGO_URL, BUSINESS, SERVICES } from '@/lib/constants';
import { useLeadStepper } from '@/contexts/LeadStepperContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Showroom', href: '/showroom' },
  { label: 'Design', href: '/interior-design' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { openStepper } = useLeadStepper();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0d1117]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5' : 'bg-transparent'
      }`}
    >
      {/* Top info bar */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 border-b border-white/5"
        style={{ background: 'rgba(13,17,23,0.92)' }}>
        <div className="flex items-center gap-6 text-xs text-white/50" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 500 }}>
          <span>📍 {BUSINESS.address}</span>
          <span>⏰ {BUSINESS.hours.weekdays}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#394696] font-bold" style={{ fontFamily: 'Figtree, sans-serif' }}>✓ Financing Available</span>
          <a href={BUSINESS.phoneHref}
            className="flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition-colors"
            style={{ fontFamily: 'Figtree, sans-serif' }}>
            <Phone size={11} /> {BUSINESS.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex items-center justify-between px-5 lg:px-8 h-16">
        {/* Logo */}
        <Link href="/">
          <img src={LOGO_URL} alt="Sure-Fix Remodeling" className="h-12 w-auto object-contain cursor-pointer" />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <div key={link.label} className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}>
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-colors ${
                    location.startsWith('/services') ? 'text-white' : 'text-white/65 hover:text-white'
                  }`}
                  style={{ fontFamily: 'Figtree, sans-serif' }}
                >
                  {link.label}
                  <ChevronDown size={13} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full left-0 mt-1 w-60 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                      style={{ background: 'rgba(13,17,23,0.99)', backdropFilter: 'blur(16px)' }}
                    >
                      {SERVICES.map((s) => (
                        <Link key={s.id} href={s.slug}>
                          <div className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0"
                            style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                            <span className="text-base">{s.icon}</span>
                            {s.title}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={link.label} href={link.href}>
                <span className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                  location === link.href ? 'text-white' : 'text-white/65 hover:text-white'
                }`} style={{ fontFamily: 'Figtree, sans-serif' }}>
                  {link.label}
                </span>
              </Link>
            )
          )}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a href={BUSINESS.phoneHref}
            className="hidden md:flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white transition-colors"
            style={{ fontFamily: 'Figtree, sans-serif' }}>
            <Phone size={14} className="text-[#394696]" />
            {BUSINESS.phone}
          </a>
          <motion.button
              type="button"
              onClick={() => openStepper()}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white cursor-pointer uppercase tracking-wider"
              style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', border: 'none' }}
            >
              Free Estimate
            </motion.button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-white/10"
            style={{ background: 'rgba(13,17,23,0.99)', backdropFilter: 'blur(16px)' }}
          >
            <div className="px-5 py-4 flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link href={link.href}>
                    <span className="block px-3 py-3 text-sm font-bold uppercase tracking-widest text-white/75 hover:text-white transition-colors cursor-pointer"
                      style={{ fontFamily: 'Figtree, sans-serif' }}>
                      {link.label}
                    </span>
                  </Link>
                  {link.hasDropdown && (
                    <div className="pl-6 flex flex-col gap-0.5 mb-2">
                      {SERVICES.map((s) => (
                        <Link key={s.id} href={s.slug}>
                          <span className="flex items-center gap-2 px-3 py-2 text-xs text-white/50 hover:text-white/80 transition-colors cursor-pointer"
                            style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                            {s.icon} {s.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-white/10 mt-2 flex flex-col gap-2">
                <a href={BUSINESS.phoneHref}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold text-white border border-white/20"
                  style={{ fontFamily: 'Figtree, sans-serif' }}>
                  <Phone size={15} className="text-[#394696]" /> {BUSINESS.phone}
                </a>
                <button
                  type="button"
                  onClick={() => openStepper()}
                  className="block w-full text-center px-4 py-3 rounded-lg text-sm font-bold text-white cursor-pointer uppercase tracking-wider"
                  style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', border: 'none' }}
                >
                  Get Free Estimate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
