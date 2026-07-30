import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import KitchenPromotionSection from '@/components/KitchenPromotionSection';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { BUSINESS } from '@/lib/constants';
import {
  KITCHEN_PROMOTION,
  KITCHEN_PROMOTION_TERMS,
  useKitchenPromotion,
} from '@/lib/kitchen-promotion';
import { SEASONAL_BUNDLES, YEAR_ROUND_PROMOS } from '@/lib/promotions-data';
import { breadcrumbList, useSeo } from '@/lib/seo';
import { PAGE_SEO } from '@/lib/seo-config';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

export default function Promotions() {
  const promotion = useKitchenPromotion();
  const { openKitchenPromoStepper, openStepper } = useLeadStepper();

  useSeo({
    ...(promotion.active
      ? PAGE_SEO.promotions
      : {
          title: 'Remodeling Promotions & Financing',
          description:
            'Explore current Sure-Fix Remodeling savings, financing, and seasonal offers for Lehigh Valley homeowners.',
          path: '/promotions',
        }),
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Promotions', path: '/promotions' },
      ]),
      ...(promotion.active
        ? [{
            '@context': 'https://schema.org',
            '@type': 'Offer',
            name: 'Sure-Fix Kitchen Remodeling Sale — 10% Off',
            description: `${KITCHEN_PROMOTION.headline}. ${KITCHEN_PROMOTION.promise}`,
            validThrough: promotion.validThrough,
            availability: 'https://schema.org/InStock',
            offeredBy: { '@id': 'https://surefixremodelinglv.com/#localbusiness' },
            url: 'https://surefixremodelinglv.com/promotions',
          }]
        : []),
      ...YEAR_ROUND_PROMOS.map(item => ({
        '@context': 'https://schema.org',
        '@type': 'Offer',
        name: item.title,
        description: item.positioning,
        availability: 'https://schema.org/InStock',
        offeredBy: { '@id': 'https://surefixremodelinglv.com/#localbusiness' },
        url: 'https://surefixremodelinglv.com/promotions',
      })),
    ],
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#111827] text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 82% 20%, rgba(152,54,49,0.48), transparent 33%), radial-gradient(circle at 15% 90%, rgba(57,70,150,0.75), transparent 42%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-[max(9rem,calc(7.5rem+env(safe-area-inset-top,0px)))] lg:px-8 lg:pb-28">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
            <motion.div variants={fadeUp} className="mb-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#983631] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em]">
                <Sparkles size={12} />
                {promotion.active ? KITCHEN_PROMOTION.eyebrow : 'Sure-Fix Promotions'}
              </span>
              {promotion.active ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                  <CalendarDays size={12} />
                  {promotion.deadlineLabel}
                </span>
              ) : null}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="leading-[0.94]"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(3.2rem, 9vw, 7rem)',
                fontWeight: 400,
                letterSpacing: '-0.04em',
              }}
            >
              {promotion.active ? (
                <>
                  Your new kitchen.
                  <span className="block italic text-white/75">Our lowest prices.</span>
                </>
              ) : (
                <>
                  Savings built around
                  <span className="block italic text-white/75">your next project.</span>
                </>
              )}
            </motion.h1>

            {promotion.active ? (
              <>
                <motion.p variants={fadeUp} custom={2} className="mt-7 text-2xl font-black sm:text-3xl">
                  10% off your kitchen remodel — save up to $2,000.
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  custom={3}
                  className="mt-3 text-sm font-black uppercase tracking-[0.25em] text-white"
                >
                  {KITCHEN_PROMOTION.promise}
                </motion.p>
              </>
            ) : (
              <motion.p variants={fadeUp} custom={2} className="mt-7 max-w-2xl text-lg text-white/70">
                Ask about current savings and flexible financing for your Sure-Fix remodeling project.
              </motion.p>
            )}

            <motion.div variants={fadeUp} custom={4} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() =>
                  promotion.active
                    ? openKitchenPromoStepper('promotions-hero')
                    : openStepper()
                }
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#983631] px-8 py-4 text-xs font-black uppercase tracking-[0.17em] text-white"
              >
                {promotion.active ? 'Claim My Kitchen Savings' : 'Request an Estimate'}
                <ArrowRight size={15} />
              </button>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-xs font-black uppercase tracking-[0.15em] text-white backdrop-blur-sm"
              >
                <Phone size={14} /> {BUSINESS.phone}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {promotion.active ? (
        <>
          <KitchenPromotionSection source="promotions-feature" className="bg-slate-50" />
          <section className="border-y border-slate-200 bg-white px-5 py-14 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#983631]">
                  Do not wait on the kitchen you want
                </p>
                <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
                  Lock in this month’s kitchen pricing.
                </h2>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {['Free kitchen consultation', 'Offer attached to your request', 'One design-build team'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <CheckCircle2 size={15} className="shrink-0 text-[#394696]" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[10px] text-slate-400">{KITCHEN_PROMOTION_TERMS}</p>
              </div>
              <button
                type="button"
                onClick={() => openKitchenPromoStepper('promotions-midpage-cta')}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#394696] px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-white"
              >
                Start My Kitchen Plan <ArrowRight size={15} />
              </button>
            </div>
          </section>
        </>
      ) : null}

      <section className="bg-slate-50 px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#394696]">
              More ways to save
            </p>
            <h2
              className="mt-2 text-4xl text-slate-950"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              Standing offers for our community.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {YEAR_ROUND_PROMOS.map((item, index) => (
              <motion.article
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={index}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7"
              >
                <span className="text-2xl text-[#394696]">{item.icon}</span>
                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-[#983631]">{item.tag}</p>
                <h3 className="mt-2 text-2xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-base font-bold text-[#394696]">{item.headline}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.savings}</p>
                <button
                  type="button"
                  onClick={() => openStepper()}
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#394696]"
                >
                  Ask About This Offer <ArrowRight size={14} />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#983631]">
              Project planning
            </p>
            <h2
              className="mt-2 text-4xl text-slate-950"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              Other seasonal opportunities.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {SEASONAL_BUNDLES.map(item => (
              <article key={item.id} className="rounded-3xl border border-slate-200 p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#394696]">{item.spotlight}</p>
                <h3 className="mt-3 text-xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 font-bold text-[#983631]">{item.headline}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.savings}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
