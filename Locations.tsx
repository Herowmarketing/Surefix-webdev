/*
 * LOCATIONS — Sure-Fix Remodeling service-area hub
 *
 * Editorial luxury layout that doubles as the local SEO surface.
 * Each card deep-links to /locations/:slug for the per-city page.
 */
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, MapPin, Phone, Compass } from 'lucide-react';
import { LOCATIONS } from '@/lib/locations-data';
import { BUSINESS } from '@/lib/constants';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { useSeo, breadcrumbList, SITE_URL } from '@/lib/seo';
import { PAGE_SEO } from '@/lib/seo-config';
import PhoneLink from '@/components/PhoneLink';

const SERIF = '"Cormorant Garamond", Georgia, serif';
const SANS = '"Figtree", system-ui, sans-serif';
const CTA_BLUE = '#394696';
const CTA_RED = '#983631';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };

export default function Locations() {
  const { openStepper } = useLeadStepper();
  useSeo({
    ...PAGE_SEO.locations,
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Locations', path: '/locations' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Sure-Fix Remodeling Service Areas',
        itemListElement: LOCATIONS.map((l, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: l.displayName,
          url: `${SITE_URL}/locations/${l.slug}`,
        })),
      },
    ],
  });

  const grouped = LOCATIONS.reduce<Record<string, typeof LOCATIONS[number][]>>(
    (acc, loc) => {
      (acc[loc.state] ||= []).push(loc);
      return acc;
    },
    {},
  );

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 70% at 80% 0%, rgba(57,70,150,0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 0% 100%, rgba(152,54,49,0.13) 0%, transparent 65%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
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
              Service Areas
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
              <span className="block italic font-normal">Where we work,</span>
              <span className="block font-light">how we work, neighborhood by neighborhood.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mb-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Sure-Fix runs design-build projects across the Lehigh Valley and Western New Jersey from our Easton showroom. Pick your town to see the local crews, brand allies, and project specialties we bring to your block.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap items-center gap-3">
              <motion.button
                type="button"
                onClick={() => openStepper()}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-lg shadow-black/30"
                style={{ background: CTA_BLUE, fontFamily: SANS, border: 'none' }}
              >
                Book a local visit
                <ArrowRight size={14} />
              </motion.button>
              <PhoneLink
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-800 transition-colors hover:bg-slate-50"
                style={{ fontFamily: SANS }}
              >
                <Phone size={14} />
                {BUSINESS.phone}
              </PhoneLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* GROUPED BY STATE */}
      {Object.entries(grouped).map(([state, list]) => (
        <section
          key={state}
          className="border-t border-slate-200"
          style={{ background: state === 'PA' ? 'rgba(57,70,150,0.05)' : 'transparent' }}
        >
          <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="mb-10 flex items-end justify-between gap-4"
            >
              <div>
                <motion.p
                  variants={fadeUp}
                  custom={0}
                  className="mb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#394696]"
                  style={{ fontFamily: SANS }}
                >
                  {state === 'PA' ? 'Lehigh Valley' : 'Western New Jersey'}
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="text-slate-900"
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 300,
                    fontSize: 'clamp(1.85rem, 4vw, 2.85rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.08,
                  }}
                >
                  {state === 'PA' ? <>Pennsylvania <span className="italic">homes.</span></> : <>New Jersey <span className="italic">homes.</span></>}
                </motion.h2>
              </div>
              <Compass size={28} className="hidden text-slate-400 sm:block" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {list.map((loc, i) => (
                <motion.div key={loc.slug} variants={fadeUp} custom={i}>
                  <Link href={`/locations/${loc.slug}`}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      className="group relative flex h-full cursor-pointer flex-col gap-4 overflow-hidden rounded-3xl border border-slate-200 p-6 transition-colors hover:border-[#394696]/40 sm:p-7"
                      style={{
                        background:
                          'linear-gradient(155deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em]"
                          style={{
                            borderColor: `${CTA_BLUE}55`,
                            background: `${CTA_BLUE}1f`,
                            color: '#0f172a',
                            fontFamily: SANS,
                          }}
                        >
                          <MapPin size={11} /> {loc.state}
                        </span>
                        <ArrowRight
                          size={16}
                          className="text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-slate-900"
                        />
                      </div>
                      <div>
                        <h3
                          className="text-slate-900"
                          style={{
                            fontFamily: SERIF,
                            fontWeight: 400,
                            fontSize: 'clamp(1.6rem, 2.4vw, 2rem)',
                            letterSpacing: '-0.012em',
                            lineHeight: 1.05,
                          }}
                        >
                          {loc.city}
                        </h3>
                        <p
                          className="mt-1 text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500"
                          style={{ fontFamily: SANS }}
                        >
                          {loc.county} County
                        </p>
                      </div>
                      <p
                        className="text-sm italic leading-relaxed text-slate-600"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {loc.tagline}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-1.5">
                        {loc.featuredServices.slice(0, 3).map((svc) => (
                          <span
                            key={svc}
                            className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-semibold text-slate-600"
                            style={{ fontFamily: SANS }}
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="border-t border-slate-200 bg-[rgba(152,54,49,0.05)]">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#983631]"
              style={{ fontFamily: SANS }}
            >
              Don’t see your town?
            </p>
            <h2
              className="mb-4 text-slate-900"
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(1.85rem, 4vw, 2.6rem)',
                letterSpacing: '-0.02em',
              }}
            >
              We cover the <span className="italic">entire Lehigh Valley</span> and most of Western NJ.
            </h2>
            <p
              className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              The cities above are where we work most often — but our crews routinely travel further when a project calls for it. Tell us your zip code and we’ll confirm coverage on the spot.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <motion.button
                type="button"
                onClick={() => openStepper()}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-lg shadow-black/30"
                style={{ background: CTA_RED, fontFamily: SANS, border: 'none' }}
              >
                Confirm coverage
                <ArrowRight size={14} />
              </motion.button>
              <PhoneLink
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-800 transition-colors hover:bg-slate-50"
                style={{ fontFamily: SANS }}
              >
                <Phone size={14} />
                {BUSINESS.phone}
              </PhoneLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
