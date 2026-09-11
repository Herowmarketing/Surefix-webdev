import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Phone, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { BUSINESS } from '@/lib/constants';
import {
  KITCHEN_PROMOTION,
  KITCHEN_PROMOTION_TERMS,
  useKitchenPromotion,
} from '@/lib/kitchen-promotion';
import { SITE_IMAGES } from '@/lib/site-images';
import PhoneLink from '@/components/PhoneLink';

type KitchenPromotionSectionProps = {
  source: string;
  compact?: boolean;
  showImage?: boolean;
  className?: string;
};

export default function KitchenPromotionSection({
  source,
  compact = false,
  showImage = true,
  className = '',
}: KitchenPromotionSectionProps) {
  const promotion = useKitchenPromotion();
  const { openKitchenPromoStepper } = useLeadStepper();

  if (!promotion.active) return null;

  const content = (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 88% 10%, rgba(152,54,49,0.16), transparent 34%), radial-gradient(circle at 8% 90%, rgba(57,70,150,0.17), transparent 38%)',
        }}
      />
      <div className={`relative grid ${showImage ? 'lg:grid-cols-[0.92fr_1.08fr]' : 'grid-cols-1'}`}>
        {showImage ? (
          <div className="relative min-h-[300px] overflow-hidden lg:min-h-[500px]">
            <img
              src={SITE_IMAGES.kitchen}
              alt="Custom Sure-Fix kitchen remodel"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/75 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-slate-950/65 p-4 text-white backdrop-blur-md sm:inset-x-7 sm:bottom-7">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/70">
                Sure-Fix Kitchen Sale
              </p>
              <p className="mt-1 text-lg font-black">{promotion.deadlineLabel}</p>
            </div>
          </div>
        ) : null}

        <div className={`${compact ? 'p-6 sm:p-8' : 'p-7 sm:p-10 lg:p-14'} flex flex-col justify-center`}>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#983631] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <Sparkles size={12} />
              {KITCHEN_PROMOTION.eyebrow}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#394696]/25 bg-[#394696]/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#394696]">
              <CalendarDays size={12} />
              {promotion.deadlineLabel}
            </span>
          </div>

          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#394696]">
            {KITCHEN_PROMOTION.promise}
          </p>
          <h2
            className="mt-3 text-slate-950"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: compact ? 'clamp(2rem, 5vw, 3.25rem)' : 'clamp(2.5rem, 6vw, 4.6rem)',
              fontWeight: 400,
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
            }}
          >
            Save <span className="italic text-[#983631]">10%</span>
            <span className="mt-1 block text-[0.62em] font-semibold not-italic tracking-[-0.02em] text-slate-800">
              up to $2,000 on your kitchen remodel
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
            {KITCHEN_PROMOTION.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <motion.button
              type="button"
              onClick={() => openKitchenPromoStepper(source)}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#983631] px-7 py-3.5 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-[#983631]/20"
            >
              Claim My Kitchen Savings <ArrowRight size={15} />
            </motion.button>
            <PhoneLink
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-slate-800 transition-colors hover:border-[#394696] hover:text-[#394696]"
            >
              <Phone size={14} /> {BUSINESS.phone}
            </PhoneLink>
            <Link
              href="/services/kitchen"
              className="inline-flex min-h-[50px] items-center justify-center px-3 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#394696] hover:text-[#2a3578]"
            >
              Explore Kitchen Remodeling
            </Link>
          </div>
          <p className="mt-5 max-w-xl text-[10px] leading-relaxed text-slate-400">
            {KITCHEN_PROMOTION_TERMS}
          </p>
        </div>
      </div>
    </div>
  );

  if (compact) return <div className={className}>{content}</div>;

  return (
    <section
      aria-label="Limited-time kitchen remodeling promotion"
      className={`px-4 py-16 min-[400px]:px-5 min-[400px]:py-20 lg:px-8 ${className}`}
    >
      <div className="mx-auto max-w-7xl">{content}</div>
    </section>
  );
}
