/*
 * NAVBAR — Sure-Fix Remodeling
 * Desktop: glass utility bar + hover dropdowns.
 * Mobile: hamburger morphs in place; nav labels expand LEFT from the button (clipped reveal),
 *          pushing the Free Estimate CTA aside — all in one header row, no full-width sheet.
 */
import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from 'framer-motion';
import { Phone, ChevronDown } from 'lucide-react';
import { LOGO_URL, BUSINESS, SERVICES } from '@/lib/constants';
import { buildPrimaryNav, hasNavChildren } from '@/lib/navigation';
import type { PrimaryNavEntry } from '@/lib/navigation';
import { useLeadStepper } from '@/contexts/LeadStepperContext';

type LeafNavEntry = Extract<PrimaryNavEntry, { href: string }>;

const PRIMARY_NAV_ENTRIES = buildPrimaryNav(SERVICES);
const springEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function MenuMorphGlyph({ open }: { open: boolean }) {
  return (
    <div
      className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md"
      aria-hidden
    >
      <div className="relative flex h-[15px] w-[22px] flex-col justify-between">
        <motion.span
          className="block h-[2px] w-full origin-center rounded-full bg-white"
          animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        />
        <motion.span
          className="block h-[2px] w-full rounded-full bg-white/90"
          animate={open ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.18 }}
        />
        <motion.span
          className="block h-[2px] w-full origin-center rounded-full bg-white"
          animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [location] = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDesktopExpandedId(null);
    setMobileServicesOpen(false);
  }, [location]);

  useEffect(() => {
    if (!mobileOpen) setMobileServicesOpen(false);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileServicesOpen) setMobileServicesOpen(false);
        else setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen, mobileServicesOpen]);

  const solid = scrolled || mobileOpen || mobileServicesOpen;

  const servicesEntry = PRIMARY_NAV_ENTRIES.find((e) => e.id === 'services' && hasNavChildren(e));

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ${
        solid
          ? 'border-b border-white/5 bg-[#0d1117]/98 shadow-lg shadow-black/30 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div
        className="hidden items-center justify-between border-b border-white/5 px-6 py-1.5 md:flex"
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
          <span className="text-xs font-bold text-[#394696]" style={{ fontFamily: 'Figtree, sans-serif' }}>
            ✓ Financing Available
          </span>
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center gap-1.5 text-xs font-bold text-white/80 transition-colors hover:text-white"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            <Phone size={11} /> {BUSINESS.phone}
          </a>
        </div>
      </div>

      <LayoutGroup>
        <nav className="relative flex h-16 items-center justify-between gap-1.5 px-3 min-[400px]:gap-2 min-[400px]:px-5 lg:gap-3 lg:px-8">
          <Link href="/" className="-m-1 shrink-0 p-1 min-[400px]:m-0 min-[400px]:p-0">
            <img
              src={LOGO_URL}
              alt="Sure-Fix Remodeling"
              className="h-10 w-auto cursor-pointer object-contain min-[400px]:h-12"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden flex-1 items-center justify-end gap-0.5 lg:flex">
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
                    className={`flex items-center gap-1 rounded-md px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                      location.startsWith('/services')
                        ? 'text-white'
                        : 'text-white/65 hover:text-white'
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
                        <div className="max-h-[min(70vh,28rem)] overflow-y-auto px-2 py-2">
                          {entry.children.map((child) => (
                            <Link key={child.href + child.label} href={child.href}>
                              <motion.span
                                className="group/drop flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-[13px] text-white/[0.75] transition-colors duration-300 hover:text-white"
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
                <Link key={entry.id} href={(entry as LeafNavEntry).href}>
                  <motion.span
                    className={`block cursor-pointer rounded-md px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                      location === (entry as LeafNavEntry).href
                        ? 'text-white'
                        : 'text-white/65 hover:text-white'
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

          {/* Right cluster: desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={BUSINESS.phoneHref}
              className="hidden items-center gap-2 text-sm font-bold text-white/80 transition-colors hover:text-white md:flex"
              style={{ fontFamily: 'Figtree, sans-serif' }}
            >
              <Phone size={14} className="text-[#394696]" />
              {BUSINESS.phone}
            </a>
            <motion.button
              layout
              type="button"
              onClick={() => openStepper()}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider text-white"
              style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', border: 'none' }}
            >
              Free Estimate
            </motion.button>
          </div>

          {/* Right cluster: mobile — inline strip emerges from hamburger, pushes CTA */}
          <div className="relative flex min-w-0 flex-1 items-center justify-end lg:hidden">
            <div className="relative flex min-w-0 items-center justify-end gap-1">
              {/* Expanding link rail (origin at hamburger → opens left) */}
              <motion.div
                initial={false}
                className={`overflow-hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                animate={{
                  maxWidth: mobileOpen ? (prefersReducedMotion ? 420 : 420) : 0,
                  opacity: mobileOpen ? 1 : 0,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.15 }
                    : { type: 'spring', stiffness: 420, damping: 36, mass: 0.7 }
                }
              >
                <motion.div
                  className="flex max-w-[min(calc(100vw-9.25rem),21rem)] flex-nowrap items-center justify-end gap-0.5 overflow-x-auto pr-1 [scrollbar-width:none] min-[400px]:max-w-[min(calc(100vw-11rem),24rem)] min-[400px]:gap-1 [&::-webkit-scrollbar]:hidden touch-pan-x"
                  style={{
                    WebkitMaskImage: mobileOpen
                      ? 'linear-gradient(90deg, transparent 0%, black 8%, black 100%)'
                      : undefined,
                    maskImage: mobileOpen ? 'linear-gradient(90deg, transparent 0%, black 8%, black 100%)' : undefined,
                  }}
                  initial={false}
                  animate={{ x: mobileOpen ? 0 : 14 }}
                  transition={
                    prefersReducedMotion ? { duration: 0.12 } : { type: 'spring', stiffness: 460, damping: 34 }
                  }
                >
                  {PRIMARY_NAV_ENTRIES.map((entry, ei) =>
                    hasNavChildren(entry) ? (
                      <div key={entry.id} className="relative shrink-0">
                        <motion.button
                          type="button"
                          aria-expanded={mobileServicesOpen && entry.id === 'services'}
                          initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
                          animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : 10 }}
                          transition={{
                            delay: prefersReducedMotion || !mobileOpen ? 0 : 0.03 + ei * 0.035,
                            type: 'spring',
                            stiffness: 460,
                            damping: 32,
                          }}
                          onClick={() =>
                            setMobileServicesOpen((s) => (entry.id === 'services' ? !s : false))
                          }
                          className={`inline-flex min-h-[44px] items-center gap-0.5 whitespace-nowrap rounded-md px-2 py-2 text-[10px] font-bold uppercase tracking-[0.18em] min-[400px]:px-2.5 min-[400px]:text-[11px] ${
                            mobileServicesOpen
                              ? 'text-white'
                              : 'text-white/75 hover:text-white'
                          }`}
                          style={{ fontFamily: 'Figtree, sans-serif' }}
                        >
                          {entry.label}
                          <ChevronDown
                            size={12}
                            className={`opacity-80 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                          />
                        </motion.button>
                      </div>
                    ) : (
                      <Link key={entry.id} href={(entry as LeafNavEntry).href}>
                        <motion.span
                          initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
                          animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : 10 }}
                          transition={{
                            delay: prefersReducedMotion || !mobileOpen ? 0 : 0.03 + ei * 0.035,
                            type: 'spring',
                            stiffness: 460,
                            damping: 32,
                          }}
                          onClick={() => setMobileOpen(false)}
                          className={`inline-flex min-h-[44px] cursor-pointer items-center whitespace-nowrap rounded-md px-2 py-2 text-[10px] font-bold uppercase tracking-[0.2em] min-[400px]:px-2.5 min-[400px]:text-[11px] ${
                            location === (entry as LeafNavEntry).href
                              ? 'text-white'
                              : 'text-white/75 hover:text-white'
                          }`}
                          style={{ fontFamily: 'Figtree, sans-serif' }}
                        >
                          {entry.label}
                        </motion.span>
                      </Link>
                    )
                  )}
                </motion.div>
              </motion.div>

              <motion.button
                layout
                layoutId="mobile-free-estimate"
                type="button"
                onClick={() => openStepper()}
                whileTap={{ scale: 0.97 }}
                className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white min-[400px]:px-3.5"
                style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', border: 'none' }}
              >
                <span className="hidden min-[400px]:inline">Free Estimate</span>
                <span className="inline min-[400px]:hidden">Free Est.</span>
              </motion.button>

              <motion.button
                layout
                type="button"
                onClick={() => {
                  setMobileOpen((o) => !o);
                  setMobileServicesOpen(false);
                }}
                className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white [-webkit-tap-highlight-color:transparent] min-[400px]:size-[2.875rem]"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              >
                <MenuMorphGlyph open={mobileOpen} />
              </motion.button>
            </div>

            {/* Services flyout — anchored under header row, still inside header chrome */}
            <AnimatePresence>
              {mobileOpen && mobileServicesOpen && servicesEntry && hasNavChildren(servicesEntry) && (
                <motion.div
                  key="mobile-svc-flyout"
                  role="menu"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.99 }}
                  transition={{ duration: 0.22, ease: springEase }}
                  className="absolute left-2 right-2 top-full z-[60] mx-auto mt-1 max-h-[min(62dvh,380px)] w-auto max-w-lg overflow-y-auto rounded-xl border border-white/[0.1] py-2 shadow-2xl min-[480px]:left-auto min-[480px]:right-0 min-[480px]:mx-0 min-[480px]:w-[min(18rem,calc(100vw-2.5rem))]"
                  style={{
                    background: 'linear-gradient(165deg,rgba(20,26,38,0.98),rgba(8,11,17,0.99))',
                    backdropFilter: 'blur(18px)',
                  }}
                >
                  {servicesEntry.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <span
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="flex min-h-[48px] cursor-pointer items-center gap-3 px-4 py-3 text-sm font-semibold text-white/85 transition-colors active:bg-white/[0.08] hover:bg-white/[0.06] hover:text-white"
                        style={{ fontFamily: 'Figtree, sans-serif' }}
                        role="menuitem"
                      >
                        <span className="opacity-75">{child.icon ?? '·'}</span>
                        {child.label}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </LayoutGroup>
    </header>
  );
}
