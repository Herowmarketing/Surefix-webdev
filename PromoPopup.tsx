/*
 * PromoPopup — $500 Friends & Family Gift Card lead-capture popup.
 *
 * Surfaces the $500 offer from the Promotions page to incentivize prospects to
 * share contact info. Triggered by a short dwell timer or desktop exit-intent,
 * shown at most once per suppression window, and never on the thank-you page.
 *
 * Submissions hit the same backend as every other form (/api/project-inquiry)
 * so leads land in Sanity, fire the operations email, carry attribution, and
 * record the Google Ads conversion.
 */
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { X, Phone, Mail, User, Gift, CheckCircle2 } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { GIFT_CARD_TERMS } from '@/lib/promotions-data';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { buildEnhancedConversionUserData, getAttributionPayload, trackLeadSubmission } from '@/lib/analytics';

const STORAGE_KEY = 'sf_promo_500_popup_v2';
const SUPPRESS_DAYS = 7;
const DWELL_MS = 12000;

function shouldSuppress(): boolean {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) return false;
    if (v === 'submitted') return true;
    const ts = Number(v);
    if (Number.isFinite(ts)) return Date.now() - ts < SUPPRESS_DAYS * 86_400_000;
    return false;
  } catch {
    return false;
  }
}

function remember(value: 'submitted' | 'dismissed') {
  try {
    localStorage.setItem(STORAGE_KEY, value === 'submitted' ? 'submitted' : String(Date.now()));
  } catch {
    /* ignore storage errors (private mode, etc.) */
  }
}

export default function PromoPopup() {
  const [location] = useLocation();
  const { isOpen: stepperOpen } = useLeadStepper();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [honeypot, setHoneypot] = useState('');

  const triggered = useRef(false);

  // Arm the trigger once per page session.
  useEffect(() => {
    if (triggered.current) return;
    if (typeof window === 'undefined') return;
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

    const onMouseOut = (e: MouseEvent) => {
      // Desktop exit-intent: cursor leaves through the top of the viewport.
      if (e.clientY <= 0 && !e.relatedTarget) fire();
    };

    timer = window.setTimeout(fire, DWELL_MS);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [location]);

  // Lock body scroll + escape to close while open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Never stack on top of the lead stepper.
  useEffect(() => {
    if (stepperOpen && open) setOpen(false);
  }, [stepperOpen, open]);

  const handleClose = () => {
    setOpen(false);
    if (!submitted) remember('dismissed');
  };

  const canSubmit = !!(form.name.trim() && form.phone.trim() && form.email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !canSubmit) return;
    setSubmitting(true);
    setError('');

    const attribution = getAttributionPayload();

    try {
      const res = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          projectType: '$500 Gift Card Offer',
          projectDetails: 'Claimed the $500 Friends & Family Gift Card offer via website popup.',
          sourcePage: 'promo-popup-500-gift-card',
          company: honeypot,
          attribution,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }
      trackLeadSubmission({
        projectType: '$500 Gift Card Offer',
        timeline: 'Promo popup',
        userData: buildEnhancedConversionUserData({
          name: form.name,
          email: form.email,
          phone: form.phone,
        }),
      });
      remember('submitted');
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `We could not submit your request. Please call us at ${BUSINESS.phone}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm text-slate-900 placeholder-slate-400 transition-all duration-200 focus:border-[#394696] focus:outline-none';

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="promo-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none fixed inset-0 z-[9990]"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }}
          />

          <motion.div
            key="promo-modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-[9991] flex items-center justify-center p-4"
            style={{ pointerEvents: 'none' }}
            role="dialog"
            aria-modal="true"
            aria-label="$500 gift card offer"
          >
            <div
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
              style={{ pointerEvents: 'auto', maxHeight: '92vh', overflowY: 'auto' }}
            >
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X size={16} />
              </button>

              {/* Offer banner — brand red / white / blue */}
              <div
                className="px-6 pb-6 pt-8 text-center text-white"
                style={{ background: 'linear-gradient(145deg, #394696 0%, #2a3578 55%, #983631 100%)' }}
              >
                <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                  <Gift size={24} />
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/75">
                  Friends &amp; Family
                </p>
                <p
                  className="my-1 text-5xl font-black leading-none"
                  style={{ fontFamily: 'Figtree, sans-serif' }}
                >
                  $500 OFF
                </p>
                <p className="text-sm font-semibold text-white/90">
                  toward your Sure-Fix remodeling project
                </p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center px-6 py-8 text-center">
                  <CheckCircle2 size={44} className="mb-4 text-[#394696]" />
                  <h2
                    className="mb-2 text-xl font-black text-slate-900"
                    style={{ fontFamily: 'Figtree, sans-serif' }}
                  >
                    Your $500 savings is reserved!
                  </h2>
                  <p className="mb-5 text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
                    Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}! A member of our team will
                    reach out within 24 hours to apply your gift card and plan your project.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-xl px-7 py-3 text-xs font-black uppercase tracking-wider text-white"
                    style={{ background: '#394696', fontFamily: 'Figtree, sans-serif' }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-6 pb-6 pt-5">
                  <p
                    className="mb-4 text-center text-sm leading-relaxed text-slate-600"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Drop your info and we&apos;ll lock in your <strong className="text-slate-900">$500 gift card</strong> —
                    apply it toward any Sure-Fix transformation.
                  </p>

                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        className={inputClass}
                        placeholder="Full Name *"
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        autoComplete="name"
                      />
                    </div>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        className={inputClass}
                        placeholder="Phone Number *"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        autoComplete="tel"
                      />
                    </div>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        className={inputClass}
                        placeholder="Email Address *"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        autoComplete="email"
                      />
                    </div>

                    {/* Honeypot — hidden from humans */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                    />

                    {error ? (
                      <p role="alert" className="text-sm font-semibold" style={{ color: '#983631' }}>
                        {error}
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={!canSubmit || submitting}
                      className="mt-1 w-full rounded-xl px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-all duration-200"
                      style={{
                        background: canSubmit && !submitting ? '#983631' : 'rgba(152,54,49,0.45)',
                        cursor: canSubmit && !submitting ? 'pointer' : 'not-allowed',
                        fontFamily: 'Figtree, sans-serif',
                      }}
                    >
                      {submitting ? 'Reserving…' : 'Claim My $500 Gift Card'}
                    </button>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="text-center text-xs font-semibold text-slate-400 transition-colors hover:text-slate-600"
                    >
                      No thanks, maybe later
                    </button>

                    <p className="mt-1 text-center text-[10px] leading-snug text-slate-400" style={{ fontFamily: 'Georgia, serif' }}>
                      {GIFT_CARD_TERMS}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
