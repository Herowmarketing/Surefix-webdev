/*
 * LOCATION DETAIL — Sure-Fix Remodeling per-city SEO page
 *
 * Reads :slug from the route. Renders local intro, neighborhoods,
 * featured services, logistics, and CTAs. Sets <title> + meta tags
 * via a small useEffect for clean local SEO.
 */
import { useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Compass,
  Home,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import { getLocation, LOCATIONS, type LocationKey } from '@/lib/locations-data';
import { BUSINESS } from '@/lib/constants';
import { useLeadStepper } from '@/contexts/LeadStepperContext';

const SERIF = '"Cormorant Garamond", Georgia, serif';
const SANS = '"Figtree", system-ui, sans-serif';
const CTA_BLUE = '#394696';
const CTA_RED = '#983631';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };

function setMeta(name: string, value: string) {
  if (typeof document === 'undefined') return;
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = value;
}

function NotFoundPanel() {
  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-3xl px-5 py-32 text-center lg:px-8">
        <p
          className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-[#983631]"
          style={{ fontFamily: SANS }}
        >
          Location not found
        </p>
        <h1
          className="mb-5 text-slate-900"
          style={{
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            letterSpacing: '-0.02em',
          }}
        >
          That city isn’t on our map <span className="italic">yet</span>.
        </h1>
        <p className="mb-7 text-base text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
          Browse our covered service areas or call our office to confirm coverage for your zip code.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/locations">
            <span
              className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white"
              style={{ background: CTA_BLUE, fontFamily: SANS }}
            >
              <ArrowLeft size={14} /> All locations
            </span>
          </Link>
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-800 transition-colors hover:bg-slate-50"
            style={{ fontFamily: SANS }}
          >
            <Phone size={14} /> {BUSINESS.phone}
          </a>
        </div>
      </section>
    </div>
  );
}

function LocationView({ loc }: { loc: LocationKey }) {
  const { openStepper } = useLeadStepper();

  useEffect(() => {
    const prev = document.title;
    document.title = `${loc.displayName} Remodeling | Sure-Fix Remodeling`;
    setMeta('description', loc.meta);
    return () => {
      document.title = prev;
    };
  }, [loc]);

  const otherLocations = LOCATIONS.filter((l) => l.slug !== loc.slug).slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 55% 65% at 90% 0%, rgba(57,70,150,0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 0% 100%, rgba(152,54,49,0.12) 0%, transparent 65%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-[max(8.5rem,calc(7rem+env(safe-area-inset-top,0px)))] sm:pb-20 sm:pt-[max(10rem,calc(8.5rem+env(safe-area-inset-top,0px)))] lg:px-8 lg:pb-20">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.div variants={fadeUp} custom={0}>
              <Link href="/locations">
                <span
                  className="mb-5 inline-flex min-h-[40px] cursor-pointer items-center gap-2 text-[11px] font-bold uppercase tracking-[0.32em] text-slate-600 transition-colors hover:text-slate-900"
                  style={{ fontFamily: SANS }}
                >
                  <ArrowLeft size={13} /> All Locations
                </span>
              </Link>
            </motion.div>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.4em] text-[#394696]"
              style={{ fontFamily: SANS }}
            >
              <MapPin size={12} /> {loc.county} County · {loc.state}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={2}
              className="mb-5 text-slate-900"
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
              }}
            >
              <span className="block italic font-normal">{loc.city}</span>
              <span className="block font-light">remodeling, by Sure-Fix.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="mb-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {loc.intro}
            </motion.p>
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap items-center gap-3">
              <motion.button
                type="button"
                onClick={() => openStepper()}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-lg shadow-black/30"
                style={{ background: CTA_BLUE, fontFamily: SANS, border: 'none' }}
              >
                Free estimate in {loc.city}
                <ArrowRight size={14} />
              </motion.button>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-800 transition-colors hover:bg-slate-50"
                style={{ fontFamily: SANS }}
              >
                <Phone size={14} /> {BUSINESS.phone}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* NEIGHBORHOODS + LOGISTICS */}
      <section className="border-y border-slate-200 bg-[rgba(57,70,150,0.05)]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                custom={0}
                className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#394696]"
                style={{ fontFamily: SANS }}
              >
                Neighborhoods we serve
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="mb-5 text-slate-900"
                style={{
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: 'clamp(1.75rem, 3.4vw, 2.4rem)',
                  letterSpacing: '-0.018em',
                }}
              >
                Local expertise, <span className="italic">block by block.</span>
              </motion.h2>
              <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-2">
                {loc.highlights.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-white/[0.1] px-3 py-1.5 text-xs font-semibold text-slate-700"
                    style={{ background: '#f8fafc', fontFamily: SANS }}
                  >
                    {n}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="rounded-3xl border border-slate-200 p-6 sm:p-8"
              style={{ background: '#f8fafc' }}
            >
              <motion.div variants={fadeUp} custom={0} className="mb-4 flex items-center gap-2">
                <Compass size={16} className="text-[#394696]" />
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.32em] text-slate-600"
                  style={{ fontFamily: SANS }}
                >
                  Why Sure-Fix in {loc.city}
                </p>
              </motion.div>
              <motion.ul variants={fadeUp} custom={1} className="flex flex-col gap-3">
                {loc.logistics.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                    style={{ fontFamily: SANS, fontWeight: 600 }}
                  >
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#394696]" />
                    {line}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mb-10 max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#983631]"
            style={{ fontFamily: SANS }}
          >
            Most requested in {loc.city}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-slate-900"
            style={{
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: 'clamp(1.85rem, 4vw, 2.8rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Featured <span className="italic">services</span>.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {loc.featuredServices.map((svc, i) => (
            <motion.div
              key={svc}
              variants={fadeUp}
              custom={i}
              className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 p-5"
              style={{ background: '#f8fafc' }}
            >
              <Sparkles size={18} className="text-[#394696]" />
              <p className="text-base font-bold text-slate-900" style={{ fontFamily: SANS }}>
                {svc}
              </p>
              <p className="text-sm text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
                Design-build through Sure-Fix — materials, permits, crews, and finish work under one roof.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* NEARBY LOCATIONS */}
      <section className="border-t border-slate-200 bg-[rgba(57,70,150,0.05)]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
          <p
            className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#394696]"
            style={{ fontFamily: SANS }}
          >
            Nearby
          </p>
          <h2
            className="mb-8 text-slate-900"
            style={{
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Other towns we serve
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherLocations.map((l) => (
              <Link key={l.slug} href={`/locations/${l.slug}`}>
                <span
                  className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full border border-white/[0.1] px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-[#394696]/60 hover:bg-[#394696]/15 hover:text-slate-900"
                  style={{ background: '#f8fafc', fontFamily: SANS }}
                >
                  <MapPin size={12} /> {l.city}, {l.state}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Home size={22} className="mx-auto mb-4 text-[#983631]" />
          <h2
            className="mb-4 text-slate-900"
            style={{
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: 'clamp(1.85rem, 4vw, 2.6rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Ready to modernize your <span className="italic">{loc.city}</span> forever home?
          </h2>
          <p
            className="mx-auto mb-7 max-w-2xl text-base leading-relaxed text-slate-600"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Tell us about your space. We’ll walk the home with you, talk through the must-do infrastructure alongside the lifestyle upgrades, and put together a plan that respects both.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              type="button"
              onClick={() => openStepper()}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-lg shadow-black/30"
              style={{ background: CTA_RED, fontFamily: SANS, border: 'none' }}
            >
              Start your project
              <ArrowRight size={14} />
            </motion.button>
            <Link href="/contact">
              <span
                className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-800 transition-colors hover:bg-slate-50"
                style={{ fontFamily: SANS }}
              >
                Contact our team
              </span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default function LocationDetail() {
  const [, params] = useRoute<{ slug: string }>('/locations/:slug');
  const loc = params?.slug ? getLocation(params.slug) : undefined;
  if (!loc) return <NotFoundPanel />;
  return <LocationView loc={loc} />;
}
