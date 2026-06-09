/*
 * PROMOTIONS — Sure-Fix Remodeling 2026
 *
 * Luxury / editorial / award-winning execution.
 *   – Quiet hero with serif display + restrained sans subhead
 *   – Year-round pillars sit above seasonal bundles
 *   – Gift-card module is its own framed module with terms
 *   – Financing module closes the page with a clear CTA
 *
 * Data lives in `lib/promotions-data.ts` so marketing can edit copy
 * without touching the layout.
 */
import { motion } from 'framer-motion';

import {
  ArrowRight,
  Gift,
  Sparkles,
  Phone,
  Calendar,
} from 'lucide-react';
import {
  GIFT_CARD_TERMS,
  SEASONAL_BUNDLES,
  YEAR_ROUND_PROMOS,
  type PromoBundle,
} from '@/lib/promotions-data';

import { BUSINESS } from '@/lib/constants';
import { useSeo, breadcrumbList } from '@/lib/seo';
import { PAGE_SEO } from '@/lib/seo-config';
import { useLeadStepper } from '@/contexts/LeadStepperContext';

const SERIF = '"Cormorant Garamond", Georgia, serif';
const SANS = '"Figtree", system-ui, sans-serif';
const CTA_BLUE = '#394696';
const CTA_RED = '#983631';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

function PromoBadge({ children, accent }: { children: React.ReactNode; accent: 'blue' | 'red' }) {
  const color = accent === 'blue' ? CTA_BLUE : CTA_RED;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em]"
      style={{
        borderColor: `${color}66`,
        background: `${color}1f`,
        color: '#0f172a',
        fontFamily: SANS,
      }}
    >
      {children}
    </span>
  );
}

function YearRoundCard({ promo, index }: { promo: PromoBundle; index: number }) {
  const accent = promo.accent === 'blue' ? CTA_BLUE : CTA_RED;
  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 p-6 sm:p-8"
      style={{
        background:
          'linear-gradient(150deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `${accent}55` }}
      />
      <div className="mb-5 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full border text-base"
          style={{
            borderColor: `${accent}55`,
            background: `${accent}1a`,
            color: '#0f172a',
            fontFamily: SERIF,
          }}
        >
          {promo.icon}
        </span>
        <PromoBadge accent={promo.accent}>Year-round</PromoBadge>
      </div>

      <p
        className="mb-1 text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500"
        style={{ fontFamily: SANS }}
      >
        {promo.tag}
      </p>
      <h3
        className="mb-3 text-2xl leading-tight text-slate-900 sm:text-[1.65rem]"
        style={{ fontFamily: SERIF, fontWeight: 400, letterSpacing: '-0.01em' }}
      >
        {promo.title}
      </h3>
      <p
        className="mb-4 text-base font-semibold text-slate-800"
        style={{ fontFamily: SANS }}
      >
        {promo.headline}
      </p>
      <p
        className="mb-6 text-sm leading-relaxed text-slate-600"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {promo.savings}
      </p>
      <p
        className="mt-auto text-xs italic leading-relaxed text-slate-500"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {promo.positioning}
      </p>
    </motion.article>
  );
}

function SeasonalCard({ promo, index }: { promo: PromoBundle; index: number }) {
  const accent = promo.accent === 'blue' ? CTA_BLUE : CTA_RED;
  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200"
      style={{ background: 'linear-gradient(180deg, #ffffff, #f8fafc 75%)' }}
    >
      <div
        className="px-6 pt-6 pb-4 sm:px-8 sm:pt-8"
        style={{
          background:
            'linear-gradient(120deg, #f8fafc 0%, #ffffff 70%)',
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <PromoBadge accent={promo.accent}>
            <Calendar size={11} />
            Seasonal
          </PromoBadge>
          {promo.spotlight && (
            <span
              className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500"
              style={{ fontFamily: SANS }}
            >
              {promo.spotlight}
            </span>
          )}
        </div>
        <p
          className="mt-5 text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500"
          style={{ fontFamily: SANS }}
        >
          {promo.tag}
        </p>
        <h3
          className="mt-1 text-2xl leading-tight text-slate-900 sm:text-[1.7rem]"
          style={{ fontFamily: SERIF, fontWeight: 400, letterSpacing: '-0.012em' }}
        >
          {promo.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-5 px-6 pb-7 pt-2 sm:px-8 sm:pb-8">
        <div
          className="flex items-baseline gap-2"
          style={{ fontFamily: SANS }}
        >
          <span className="text-xl font-black text-slate-900">{promo.headline}</span>
        </div>
        <p className="text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
          {promo.savings}
        </p>

        {promo.bonus && (
          <div
            className="flex items-start gap-3 rounded-2xl border border-slate-200 px-4 py-3"
            style={{ background: '#f8fafc' }}
          >
            <span
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              style={{ background: `${accent}26`, color: '#0f172a' }}
            >
              <Sparkles size={13} />
            </span>
            <div className="min-w-0">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500"
                style={{ fontFamily: SANS }}
              >
                Included Bonus
              </p>
              <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: SANS }}>
                {promo.bonus}
              </p>
              {promo.bonusValue && (
                <p className="text-xs text-slate-500" style={{ fontFamily: SANS }}>
                  {promo.bonusValue}
                </p>
              )}
            </div>
          </div>
        )}

        <p
          className="mt-auto text-xs italic leading-relaxed text-slate-600"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          “{promo.positioning}”
        </p>

        {promo.window && (
          <p
            className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400"
            style={{ fontFamily: SANS }}
          >
            {promo.window}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default function Promotions() {
  const { openStepper } = useLeadStepper();

  useSeo({
    ...PAGE_SEO.promotions,
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Promotions', path: '/promotions' },
      ]),
      ...YEAR_ROUND_PROMOS.map((p) => ({
        '@context': 'https://schema.org',
        '@type': 'Offer',
        name: p.title,
        description: p.positioning,
        availability: 'https://schema.org/InStock',
        eligibleCustomerType: p.tag,
        offeredBy: { '@id': 'https://surefixremodelinglv.com/#localbusiness' },
        url: 'https://surefixremodelinglv.com/promotions',
      })),
      ...SEASONAL_BUNDLES.map((p) => ({
        '@context': 'https://schema.org',
        '@type': 'Offer',
        name: p.title,
        description: p.positioning,
        availability: 'https://schema.org/InStock',
        eligibleCustomerType: p.tag,
        validThrough: p.window,
        offeredBy: { '@id': 'https://surefixremodelinglv.com/#localbusiness' },
        url: 'https://surefixremodelinglv.com/promotions',
      })),
    ],
  });

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 70% at 80% 0%, rgba(57,70,150,0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 0% 100%, rgba(152,54,49,0.15) 0%, transparent 65%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-[max(8.5rem,calc(7rem+env(safe-area-inset-top,0px)))] sm:pb-20 sm:pt-[max(10rem,calc(8.5rem+env(safe-area-inset-top,0px)))] lg:px-8 lg:pb-24">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-5 text-[11px] font-bold uppercase tracking-[0.4em] text-[#394696]"
              style={{ fontFamily: SANS }}
            >
              Sure-Fix 2026 Promotions
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mb-5 text-slate-900"
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
              }}
            >
              <span className="block italic font-normal">Savings,</span>
              <span className="block font-light">crafted like the homes we build.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mb-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Honest savings and season-aware bundles for the homeowners who treat their home like a forever home. Every promotion below is built around the same belief: the right project at the right time of year should never feel like a financial detour.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap items-center gap-3">
              <motion.button
                type="button"
                onClick={() => openStepper()}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-lg shadow-black/30 [-webkit-tap-highlight-color:transparent]"
                style={{ background: CTA_BLUE, fontFamily: SANS, border: 'none' }}
              >
                Claim a bundle
                <ArrowRight size={14} />
              </motion.button>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-800 transition-colors hover:bg-slate-50"
                style={{ fontFamily: SANS }}
              >
                <Phone size={14} />
                {BUSINESS.phone}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── YEAR-ROUND PILLARS ───────────────────────────── */}
      <section className="border-y border-slate-200 bg-[rgba(57,70,150,0.04)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="mb-10 max-w-3xl sm:mb-14"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#394696]"
              style={{ fontFamily: SANS }}
            >
              Always On
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mb-3 text-slate-900"
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(1.85rem, 4vw, 2.85rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
              }}
            >
              <span className="italic">Four</span> standing promises, every day of the year.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-2xl text-base leading-relaxed text-slate-600"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              These offers are always live — no expiration, no fine-print countdown. Whether you’re a returning client, a service member, a service-area neighbor, or someone planning a long-horizon transformation, there’s a Sure-Fix pathway sized to your project.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {YEAR_ROUND_PROMOS.map((promo, i) => (
              <YearRoundCard key={promo.id} promo={promo} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FRIENDS & FAMILY GIFT CARD ───────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid grid-cols-1 gap-0 overflow-hidden rounded-3xl border border-slate-200 lg:grid-cols-[1.1fr_1fr]"
          style={{
            background:
              'linear-gradient(135deg, rgba(57,70,150,0.18) 0%, rgba(152,54,49,0.12) 100%)',
          }}
        >
          {/* Card visual */}
          <div className="relative flex items-center justify-center px-8 py-14 sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 50% 70% at 30% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)',
              }}
            />
            {/* Stylized gift card */}
            <motion.div
              whileHover={{ rotateY: 4, rotateX: -2, y: -4 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
              className="relative w-full max-w-md"
              style={{ perspective: 1200 }}
            >
              <div
                className="overflow-hidden rounded-2xl border border-white/20 p-6 sm:p-7"
                style={{
                  background:
                    'linear-gradient(135deg, #394696 0%, #1a2440 50%, #983631 100%)',
                  boxShadow:
                    '0 24px 70px -25px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.10) inset',
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/60"
                    style={{ fontFamily: SANS }}
                  >
                    Sure-Fix · Friends & Family
                  </span>
                  <Gift size={18} className="text-white/60" />
                </div>
                <div className="mt-8 mb-2">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/55"
                    style={{ fontFamily: SANS }}
                  >
                    Gift Card Value
                  </p>
                  <p
                    className="mt-1 leading-none text-white"
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontSize: 'clamp(3.5rem, 7vw, 4.75rem)',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    $500
                  </p>
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <p
                    className="text-xs italic text-white/70"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Toward any future Sure-Fix project.
                  </p>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/45"
                    style={{ fontFamily: SANS }}
                  >
                    Est. 2008
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card copy + terms */}
          <div className="flex flex-col justify-center gap-5 px-7 py-12 sm:px-10 sm:py-14 lg:py-16">
            <PromoBadge accent="blue">
              <Gift size={11} /> Friends & Family
            </PromoBadge>
            <h3
              className="text-slate-900"
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
              }}
            >
              A keepsake card. <span className="italic">Real design budget.</span>
            </h3>
            <p className="text-base leading-relaxed text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
              Present the $500 Friends & Family card at your first appointment and we’ll apply it directly to your future project. Pass it along, frame it, gift it — and when your loved one is ready to remodel, the savings are waiting.
            </p>
            <div className="mt-1 rounded-2xl border border-slate-200 bg-white/[0.025] p-4">
              <p
                className="mb-1 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-600"
                style={{ fontFamily: SANS }}
              >
                Terms apply
              </p>
              <p className="text-xs leading-relaxed text-slate-500" style={{ fontFamily: 'Georgia, serif' }}>
                {GIFT_CARD_TERMS}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── MONTHLY + SEASONAL BUNDLES ───────────────────── */}
      <section className="border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="mb-12 max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#983631]"
              style={{ fontFamily: SANS }}
            >
              Seasonal Bundles
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mb-3 text-slate-900"
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(1.85rem, 4vw, 2.85rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
              }}
            >
              Limited-window <span className="italic">bundles</span>, never gimmicks.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-2xl text-base leading-relaxed text-slate-600"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Each bundle pairs a project discount with a free professional add-on — design preview, energy analysis, durability assessment — that genuinely de-risks the decision. Use them as planning tools first, savings second.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {SEASONAL_BUNDLES.map((promo, i) => (
              <SeasonalCard key={promo.id} promo={promo} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
