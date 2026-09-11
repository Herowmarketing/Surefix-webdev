import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarDays, ChefHat, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { BUSINESS } from '@/lib/constants';
import {
  KITCHEN_PROMOTION,
  KITCHEN_PROMOTION_TERMS,
  useKitchenPromotion,
} from '@/lib/kitchen-promotion';
import PhoneLink from '@/components/PhoneLink';

const STORAGE_KEY = 'sf_kitchen_sale_popup_2026_v1';
const SUPPRESS_DAYS = 7;
const DWELL_MS = 9000;

function shouldSuppress(): boolean {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return false;
    if (value === 'engaged') return true;
    const timestamp = Number(value);
    return Number.isFinite(timestamp) && Date.now() - timestamp < SUPPRESS_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

function remember(value: 'engaged' | 'dismissed') {
  try {
    localStorage.setItem(STORAGE_KEY, value === 'engaged' ? value : String(Date.now()));
  } catch {
    // Storage may be unavailable in private browsing.
  }
}

export default function PromoPopup() {
  const [location] = useLocation();
  const promotion = useKitchenPromotion();
  const {
    isOpen: stepperOpen,
    openKitchenPromoStepper,
  } = useLeadStepper();
  const [open, setOpen] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    if (!promotion.active || triggered.current || typeof window === 'undefined') return;
    if (location.startsWith('/thank-you') || location.startsWith('/contact')) return;
    if (shouldSuppress()) return;

    let timer = 0;
    const fire = () => {
      if (triggered.current) return;
      triggered.current = true;
      window.clearTimeout(timer);
      document.removeEventListener('mouseout', onMouseOut);
      setOpen(true);
    };
    const onMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0 && !event.relatedTarget) fire();
    };

    timer = window.setTimeout(fire, DWELL_MS);
    document.addEventListener('mouseout', onMouseOut);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [location, promotion.active]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        remember('dismissed');
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    if (stepperOpen && open) setOpen(false);
  }, [stepperOpen, open]);

  if (!promotion.active) return null;

  const close = () => {
    setOpen(false);
    remember('dismissed');
  };
  const claim = () => {
    remember('engaged');
    setOpen(false);
    openKitchenPromoStepper('kitchen-sale-popup');
  };

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close kitchen promotion"
            className="fixed inset-0 z-[9990] cursor-default bg-black/70 backdrop-blur-[5px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="kitchen-promo-popup-title"
            className="pointer-events-none fixed inset-0 z-[9991] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          >
            <div className="pointer-events-auto relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/15 text-white transition-colors hover:bg-black/30"
              >
                <X size={17} />
              </button>

              <div
                className="relative overflow-hidden px-6 pb-7 pt-9 text-center text-white sm:px-9"
                style={{ background: 'linear-gradient(145deg, #394696 0%, #25316f 55%, #983631 100%)' }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-20"
                  style={{ background: 'radial-gradient(circle at 50% 0%, white, transparent 48%)' }}
                />
                <div className="relative">
                  <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-white/15">
                    <ChefHat size={24} />
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/75">
                    {KITCHEN_PROMOTION.eyebrow}
                  </p>
                  <h2
                    id="kitchen-promo-popup-title"
                    className="mt-2 text-5xl font-black leading-none sm:text-6xl"
                  >
                    10% OFF
                  </h2>
                  <p className="mt-2 text-lg font-bold">Save up to $2,000</p>
                  <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-white">
                    {KITCHEN_PROMOTION.promise}
                  </p>
                </div>
              </div>

              <div className="px-6 py-6 text-center sm:px-9">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#983631]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#983631]">
                  <CalendarDays size={13} />
                  {promotion.deadlineLabel}
                </div>
                <p className="text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
                  Start planning the kitchen you have been waiting for and lock in Sure-Fix’s lowest kitchen pricing of the season.
                </p>
                <button
                  type="button"
                  onClick={claim}
                  className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#983631] px-6 py-3.5 text-sm font-black uppercase tracking-[0.14em] text-white"
                >
                  Claim My Kitchen Savings <ArrowRight size={16} />
                </button>
                <PhoneLink
                  className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 px-4 text-xs font-black uppercase tracking-[0.12em] text-[#394696]"
                >
                  <Phone size={14} /> Call {BUSINESS.phone}
                </PhoneLink>
                <p className="mt-3 text-[9px] leading-relaxed text-slate-400">{KITCHEN_PROMOTION_TERMS}</p>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
