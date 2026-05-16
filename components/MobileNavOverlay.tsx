/*
 * Mobile nav — full-width top banner: slides in R→L, exits L→R. Short height + nested routes collapsed.
 */
import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'wouter';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import type { PrimaryNavChild, PrimaryNavEntry } from '@/lib/navigation';
import { hasNavChildren } from '@/lib/navigation';
import { useLeadStepper } from '@/contexts/LeadStepperContext';

const springEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Props = {
  open: boolean;
  onClose: () => void;
  entries: readonly PrimaryNavEntry[];
  /** Return focus here when menu closes (e.g. hamburger `<button>`) */
  restoreFocusRef?: RefObject<HTMLElement | null>;
};

function ServiceGrid({
  children,
  prefersReducedMotion,
  parentId,
  onNavigate,
}: {
  children: readonly PrimaryNavChild[];
  prefersReducedMotion: boolean | null;
  parentId: string;
  onNavigate: () => void;
}) {
  return (
    <motion.div
      id={`panel-${parentId}`}
      role="region"
      initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.08 }
          : { opacity: { duration: 0.28, ease: springEase }, height: { duration: 0.38, ease: springEase } }
      }
      className="relative w-full overflow-hidden border-t border-white/[0.08]"
    >
      <ul className="grid grid-cols-2 gap-x-3 gap-y-2 py-4 sm:grid-cols-3">
        {children.map((child, ci) => (
          <motion.li
            key={`${parentId}-${child.href}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10, skewX: -3 }}
            animate={{ opacity: 1, y: 0, skewX: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.035 + ci * 0.04,
              duration: 0.4,
              ease: springEase,
            }}
          >
            <Link href={child.href} onClick={onNavigate} className="group/sub block">
              <span
                className="relative flex min-h-[3rem] cursor-pointer flex-col justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-white/[0.78] outline-none ring-offset-0 transition-[background-color,border-color,color,transform,box-shadow] duration-300 focus-visible:border-[#394696]/65 focus-visible:ring-[3px] focus-visible:ring-[#394696]/35 active:scale-[0.97] hover:border-[#394696]/55 hover:bg-[#394696]/14 hover:text-white"
                style={{ fontFamily: 'Figtree, sans-serif' }}
              >
                <span aria-hidden className="mb-0.5 block text-[0.95rem] leading-none opacity-[0.82]">
                  {child.icon ?? '·'}
                </span>
                <span className="leading-tight">{child.label}</span>
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function MobileNavOverlay({ open, onClose, entries, restoreFocusRef }: Props) {
  const { openStepper } = useLeadStepper();
  const [mounted, setMounted] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const sheetRef = useRef<HTMLElement | null>(null);
  const prevOpenRef = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const prevOx = document.documentElement.style.overflowX;
    document.documentElement.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.style.overflowX = prevOx;
    };
  }, [open]);

  useEffect(() => {
    if (!open) setExpandedId(null);
  }, [open]);

  /** Move focus into menu when opened (keyboard / screen readers) */
  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => {
      const root = sheetRef.current;
      if (!root) return;
      const first =
        root.querySelector<HTMLElement>(
          '[data-nav-sheet-focus-loop] button, [data-nav-sheet-focus-loop] a[href]'
        ) ?? root.querySelector<HTMLElement>('a[href], button:not([type="submit"])');
      first?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  /** Focus trap — Tab / Shift+Tab cycles only within the sheet while open */
  useEffect(() => {
    if (!open) return;
    const FOCUSABLE =
      'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const root = sheetRef.current;
      if (!root) return;
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.closest('[hidden]') && el.offsetParent !== null
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', trap);
    return () => window.removeEventListener('keydown', trap);
  }, [open]);

  /** Restore trigger focus when closing */
  useLayoutEffect(() => {
    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = open;
    if (wasOpen && !open && restoreFocusRef?.current instanceof HTMLElement) {
      restoreFocusRef.current.focus({ preventScroll: true });
    }
  }, [open, restoreFocusRef]);

  const expandedBranch =
    expandedId == null ? undefined : entries.find((e) => hasNavChildren(e) && e.id === expandedId);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="nav-backdrop"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.1 : 0.32,
            delay: prefersReducedMotion ? 0 : 0.08,
            ease: springEase,
          }}
          className="pointer-events-auto fixed inset-0 z-[100] bg-[#05070b]/55 backdrop-blur-[8px] lg:hidden supports-[backdrop-filter]:bg-[#05070b]/48"
          onClick={onClose}
        />
      )}
      {open && (
        <motion.aside
          key="nav-sheet"
          ref={sheetRef}
          role="dialog"
          id="mobile-nav-sheet"
          aria-modal="true"
          aria-label="Site navigation"
          initial={
            prefersReducedMotion
              ? { opacity: 0, y: -12 }
              : { x: '100%', skewX: -2.5, filter: 'blur(6px)', opacity: 0.94 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { x: 0, skewX: 0, filter: 'blur(0px)', opacity: 1 }
          }
          exit={
            prefersReducedMotion
              ? { opacity: 0, y: -8 }
              : { x: '100%', skewX: 3, filter: 'blur(5px)', opacity: 0.88 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0.12 }
              : {
                  x: { type: 'spring', stiffness: 272, damping: 32, mass: 0.9 },
                  skewX: { type: 'spring', stiffness: 300, damping: 34 },
                  filter: { duration: 0.52, ease: springEase },
                  opacity: { duration: 0.38, ease: springEase },
                }
          }
          style={{
            transformOrigin: '100% 0%',
            willChange: prefersReducedMotion ? undefined : 'transform, filter',
            background:
              'linear-gradient(180deg,rgba(16,21,34,0.99) 0%,rgba(6,10,18,1) 100%)',
          }}
          className={`pointer-events-auto fixed left-0 right-0 top-[calc(4rem+6px)] z-[101] flex w-full flex-col overflow-x-hidden overflow-y-auto rounded-b-[1.45rem] border border-white/[0.09] border-t-0 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.05)] lg:hidden md:top-[6.875rem] ${
            expandedBranch
              ? 'max-h-[min(540px,min(74svh,620px))]'
              : 'max-h-[min(288px,min(38svh,320px))]'
          }`}
        >
          {/* Subtle glide line following the sweep */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden rounded-b-full"
          >
            <motion.div
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#983631]/95 to-transparent"
              initial={{ x: '-120%' }}
              animate={{ x: '220%' }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.92,
                delay: prefersReducedMotion ? 0 : 0.06,
                ease: springEase,
              }}
            />
          </motion.div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-95 bg-[radial-gradient(ellipse_90%_120%_at_50%_-20%,rgba(57,70,150,0.28),transparent_55%),radial-gradient(ellipse_70%_80%_at_100%_0%,rgba(152,54,49,0.12),transparent_50%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          <div className="relative flex min-h-0 flex-col overflow-hidden px-3 pb-4 pt-3 sm:px-5">
            <motion.p
              aria-hidden
              className="mb-2.5 text-center text-[9px] uppercase tracking-[0.62em] text-white/[0.38]"
              style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 700 }}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.12, duration: 0.4, ease: springEase }}
            >
              Navigate
            </motion.p>

            <div data-nav-sheet-focus-loop className="flex min-h-0 flex-col gap-2">
              <div className="flex flex-wrap items-center justify-center gap-2 px-1">
                {entries.map((entry, ei) =>
                  !hasNavChildren(entry) ? (
                    <motion.div
                      key={entry.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.06 + ei * 0.04,
                        duration: 0.45,
                        ease: springEase,
                      }}
                    >
                      <Link href={(entry as { id: string; label: string; href: string }).href} onClick={onClose}>
                        <span
                          className="inline-flex min-h-[2.75rem] cursor-pointer items-center rounded-full border border-white/[0.12] bg-white/[0.05] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/[0.88] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none ring-offset-0 transition-[background-color,border-color,transform,color,box-shadow] focus-visible:border-[#394696]/65 focus-visible:ring-[3px] focus-visible:ring-[#394696]/35 hover:border-[#394696]/55 hover:bg-[#394696]/22 hover:text-white active:scale-[0.96]"
                          style={{ fontFamily: 'Figtree, sans-serif' }}
                        >
                          {entry.label}
                        </span>
                      </Link>
                    </motion.div>
                  ) : (
                    <Fragment key={entry.id}>
                      <motion.span
                        className="inline-flex items-center gap-2"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: prefersReducedMotion ? 0 : 0.06 + ei * 0.04,
                          duration: 0.45,
                          ease: springEase,
                        }}
                      >
                        <button
                          type="button"
                          aria-expanded={expandedId === entry.id}
                          aria-controls={`panel-${entry.id}`}
                          onClick={() =>
                            setExpandedId((prev) => (prev === entry.id ? null : entry.id))
                          }
                          className={`inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-full border px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.22em] outline-none ring-offset-0 transition-[background-color,border-color,transform,color,box-shadow] focus-visible:border-[#983631]/65 focus-visible:ring-[3px] focus-visible:ring-[#983631]/30 active:scale-[0.96] ${
                            expandedId === entry.id
                              ? 'border-[#983631]/60 bg-[#983631]/25 text-white'
                              : 'border-white/[0.14] bg-white/[0.06] text-white/[0.9] hover:border-[#983631]/35 hover:bg-[#983631]/12'
                          }`}
                          style={{ fontFamily: 'Figtree, sans-serif' }}
                        >
                          {entry.label}
                          <motion.span
                            animate={{ rotate: expandedId === entry.id ? 135 : 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                            className="text-sm leading-none opacity-[0.95]"
                          >
                            +
                          </motion.span>
                        </button>
                      </motion.span>
                    </Fragment>
                  )
                )}
              </div>

              <AnimatePresence initial={false}>
                {expandedBranch && hasNavChildren(expandedBranch) ? (
                  <ServiceGrid
                    key={expandedBranch.id}
                    parentId={expandedBranch.id}
                    children={expandedBranch.children}
                    prefersReducedMotion={prefersReducedMotion}
                    onNavigate={onClose}
                  />
                ) : null}
              </AnimatePresence>

              <motion.div
                className="mt-2 flex shrink-0 flex-row flex-wrap gap-2 border-t border-white/[0.07] pt-3"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.22,
                  duration: 0.48,
                  ease: springEase,
                }}
              >
                <a
                  href={BUSINESS.phoneHref}
                  className="group inline-flex min-h-[2.875rem] flex-1 basis-[9.5rem] items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] px-3 py-2 text-xs font-bold text-white/92 outline-none ring-offset-0 transition-colors focus-visible:border-[#394696]/55 focus-visible:ring-[3px] focus-visible:ring-[#394696]/35 hover:bg-white/[0.1]"
                  style={{ fontFamily: 'Figtree, sans-serif' }}
                >
                  <Phone size={15} className="text-[#394696]" />
                  <span className="truncate">{BUSINESS.phone}</span>
                </a>
                <motion.button
                  type="button"
                  onClick={() => {
                    onClose();
                    openStepper();
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex min-h-[2.875rem] flex-1 basis-[9.5rem] items-center justify-center rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white outline-none ring-[3px] ring-transparent transition-shadow focus-visible:ring-[#f0c4bf]/95"
                  style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', border: 'none' }}
                >
                  Free estimate
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>,
    document.body
  );
}
