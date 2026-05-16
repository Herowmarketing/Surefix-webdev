/*
 * NAVBAR — Sure-Fix Remodeling
 * Desktop: restrained glass bar + expandable sections from shared nav model.
 * Mobile: morph trigger + anchored menu sheet (nested routes tucked behind headings).
 */
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown } from 'lucide-react';
import { LOGO_URL, BUSINESS, SERVICES } from '@/lib/constants';
import { buildPrimaryNav, hasNavChildren } from '@/lib/navigation';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import MobileNavOverlay from '@/components/MobileNavOverlay';

const PRIMARY_NAV_ENTRIES = buildPrimaryNav(SERVICES);

const springEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function MenuMorphGlyph({ open }: { open: boolean }) {
  return (
    <div
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md"
      aria-hidden
    >
      <div className="relative flex h-[15px] w-[22px] flex-col justify-between">
        <motion.span
          className="block h-[2px] w-full origin-center rounded-full bg-white"
          animate={
            open
              ? { rotate: 45, y: 6.5, backgroundColor: 'rgba(255,255,255,0.95)' }
              : { rotate: 0, y: 0, backgroundColor: 'rgba(255,255,255,0.88)' }
          }
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        />
        <motion.span
          className="block h-[2px] w-full rounded-full bg-white/90"
          animate={open ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.18 }}
        />
        <motion.span
          className="block h-[2px] w-full origin-center rounded-full bg-white"
          animate={
            open
              ? { rotate: -45, y: -6.5, backgroundColor: 'rgba(255,255,255,0.95)' }
              : { rotate: 0, y: 0, backgroundColor: 'rgba(255,255,255,0.88)' }
          }
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        />
      </div>
    </div>
  );
}

export default function Navbar() {
  const { openStepper } = useLeadStepper();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopExpandedId, setDesktopExpandedId] = useState<string | null>(null);
  const [location] = useLocation();
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDesktopExpandedId(null);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0d1117]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div
        className="hidden md:flex items-center justify-between px-6 py-1.5 border-b border-white/5"
        style={{ background: 'rgba(13,17,23,0.92)' }}
      >
        <div
          className="flex items-center gap-6 text-xs text-white/50"
          style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 500 }}
        >
          <span>📍 {BUSINESS.address}</span>
          <span>⏰ {BUSINESS.hours.weekdays}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#394696] font-bold" style={{ fontFamily: 'Figtree, sans-serif' }}>
            ✓ Financing Available
          </span>
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition-colors"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            <Phone size={11} /> {BUSINESS.phone}
          </a>
        </div>
      </div>

      <nav className="flex items-center justify-between px-5 lg:px-8 h-16">
        <Link href="/">
          <img src={LOGO_URL} alt="Sure-Fix Remodeling" className="h-12 w-auto object-contain cursor-pointer" />
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {PRIMARY_NAV_ENTRIES.map((entry) =>
            hasNavChildren(entry) ? (
              <div
                key={entry.id}
                className="relative"
                onMouseEnter={() => setDesktopExpandedId(entry.id)}
                onMouseLeave={() => setDesktopExpandedId(null)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-colors ${
                    location.startsWith('/services') ? 'text-white' : 'text-white/65 hover:text-white'
                  }`}
                  style={{ fontFamily: 'Figtree, sans-serif' }}
                  aria-expanded={desktopExpandedId === entry.id}
                >
                  {entry.label}
                  <motion.span
                    animate={{ rotate: desktopExpandedId === entry.id ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  >
                    <ChevronDown size={13} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {desktopExpandedId === entry.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                      transition={{ duration: 0.28, ease: springEase }}
                      className="absolute top-full left-0 mt-1 w-[17.5rem] overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/45"
                      style={{
                        background: 'linear-gradient(165deg,rgba(20,26,38,0.98),rgba(8,11,17,0.99))',
                        backdropFilter: 'blur(22px)',
                      }}
                    >
                      <div className="pointer-events-none absolute inset-x-4 top-2 h-px rounded-full bg-gradient-to-r from-transparent via-[#394696]/50 to-transparent" />
                      <div className="max-h-[min(70vh,28rem)] overflow-y-auto py-2 px-2">
                        {entry.children.map((child) => (
                          <Link key={child.href + child.label} href={child.href}>
                            <motion.span
                              className="group/drop flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-[13px] text-white/[0.75] hover:text-white transition-colors duration-300"
                              style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}
                              whileHover={{ x: 4 }}
                              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                            >
                              <span className="text-base opacity-[0.85] transition-opacity group-hover/drop:opacity-100">
                                {child.icon ?? '·'}
                              </span>
                              <span className="tracking-tight">{child.label}</span>
                              <span
                                aria-hidden
                                className="ml-auto h-px w-8 origin-right scale-x-0 bg-gradient-to-l from-[#983631]/90 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/drop:scale-x-100"
                              />
                            </motion.span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={entry.id} href={entry.href}>
                <motion.span
                  className={`block px-3 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                    location === entry.href ? 'text-white' : 'text-white/65 hover:text-white'
                  }`}
                  style={{ fontFamily: 'Figtree, sans-serif' }}
                  whileHover={{ y: -1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                >
                  {entry.label}
                </motion.span>
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={BUSINESS.phoneHref}
            className="hidden md:flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white transition-colors"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
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
            type="button"
            ref={mobileMenuTriggerRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden rounded-full py-2 pl-3 pr-1 text-white/90 transition-colors hover:text-white"
            aria-expanded={mobileOpen}
            aria-haspopup="dialog"
            aria-controls="mobile-nav-sheet"
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          >
            <MenuMorphGlyph open={mobileOpen} />
          </button>
        </div>
      </nav>

      <MobileNavOverlay
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        entries={PRIMARY_NAV_ENTRIES}
        restoreFocusRef={mobileMenuTriggerRef}
      />
    </header>
  );
}
