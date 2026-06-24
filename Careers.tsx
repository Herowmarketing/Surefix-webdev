/*
 * CAREERS — Sure-Fix Remodeling
 * Hiring page: open roles, culture, benefits, and application CTA.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  CheckCircle2,
  Hammer,
  Users,
  TrendingUp,
  Heart,
  Send,
  Briefcase,
  Star,
} from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { useSeo, breadcrumbList } from '@/lib/seo';
import { PAGE_SEO } from '@/lib/seo-config';
import CareerApplicationModal, { GENERAL_APPLICATION } from './CareerApplicationModal';

const SERIF = '"Cormorant Garamond", Georgia, serif';
const SANS  = '"Figtree", system-ui, sans-serif';
const BLUE  = '#394696';
const RED   = '#983631';

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

// ─── Data ─────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: Hammer,
    title: 'Real Trade Craft',
    body: 'Work on meaningful residential projects — kitchens, baths, additions, and full-home transformations — that you can genuinely point to with pride.',
    accent: BLUE,
  },
  {
    icon: Users,
    title: 'Family-Run Culture',
    body: 'We are not a faceless corporation. Henry built this company from the ground up and our team reflects that — everyone knows everyone, and your work gets noticed.',
    accent: RED,
  },
  {
    icon: TrendingUp,
    title: 'Growth & Mentorship',
    body: 'Whether you are sharpening a trade skill or stepping into a project management role, we invest in the people who invest in our clients.',
    accent: BLUE,
  },
  {
    icon: Heart,
    title: 'Respect for Your Time',
    body: 'Competitive pay, consistent scheduling, and a team that communicates clearly — because good people should not have to guess where they stand.',
    accent: RED,
  },
];

type Role = {
  id:          string;
  title:       string;
  department:  string;
  type:        string;
  location:    string;
  pay:         string;
  summary:     string;
  requirements: string[];
  accent:      'blue' | 'red';
};

const OPEN_ROLES: Role[] = [
  {
    id:         'carpenter',
    title:      'Experienced Carpenter / Finish Carpenter',
    department: 'Field Production',
    type:       'Full-Time',
    location:   'Easton, PA (field-based)',
    pay:        'Competitive — DOE',
    summary:
      'Install cabinetry, trim, doors, and custom millwork on residential remodeling projects across the Lehigh Valley. You will work closely with the project manager and take ownership of your scope from rough to finish.',
    requirements: [
      '3+ years of residential carpentry experience',
      'Proficient with trim, cabinetry, and door installation',
      'Own reliable transportation and basic hand/power tools',
      'Strong attention to detail and clean finish-work ethic',
      'Valid driver\'s license',
    ],
    accent: 'blue',
  },
  {
    id:         'plumber',
    title:      'Plumber',
    department: 'Field Production',
    type:       'Full-Time',
    location:   'Easton, PA (field-based)',
    pay:        'Competitive — DOE',
    summary:
      'Perform rough-in and finish plumbing on residential remodeling projects — kitchens, bathrooms, and laundry rooms. You will install and connect fixtures, supply lines, and drains while coordinating with tile and carpentry crews to stay on schedule.',
    requirements: [
      '3+ years of residential plumbing experience',
      'Proficient with fixture installation, supply lines, and drain work',
      'Comfortable working in occupied homes with minimal disruption',
      'PA plumbing license or apprenticeship documentation preferred',
      'Valid driver\'s license',
    ],
    accent: 'red',
  },
  {
    id:         'tile-installer',
    title:      'Tile Installer',
    department: 'Field Production',
    type:       'Full-Time',
    location:   'Easton, PA (field-based)',
    pay:        'Competitive — DOE',
    summary:
      'Lay, cut, and finish ceramic, porcelain, natural stone, and mosaic tile in kitchens, bathrooms, and laundry rooms. Projects range from backsplashes and shower surrounds to full-floor installations.',
    requirements: [
      '2+ years of tile installation experience',
      'Comfortable with wet areas, shower pans, and waterproofing',
      'Ability to read layout drawings and measure accurately',
      'Experience with large-format tile a plus',
      'Valid driver\'s license',
    ],
    accent: 'blue',
  },
  {
    id:         'flooring-installer',
    title:      'Flooring Installer',
    department: 'Field Production',
    type:       'Full-Time',
    location:   'Easton, PA (field-based)',
    pay:        'Competitive — DOE',
    summary:
      'Install hardwood, luxury vinyl plank, laminate, and carpet throughout occupied and newly constructed residential spaces. You should be comfortable with subfloor prep, transitions, and pattern layouts.',
    requirements: [
      '2+ years of residential flooring installation',
      'Proficient in at least two flooring types (hardwood, LVP, carpet)',
      'Ability to prepare and level subfloors',
      'Clean, dust-conscious work habits',
      'Valid driver\'s license',
    ],
    accent: 'red',
  },
  {
    id:         'showroom-consultant',
    title:      'Showroom & Sales Consultant',
    department: 'Sales & Design',
    type:       'Full-Time',
    location:   'Easton, PA (showroom)',
    pay:        'Competitive — DOE',
    summary:
      'Guide homeowners through our in-house material showroom — countertops, tile, flooring, plumbing fixtures, and more. You will pair design intuition with product knowledge to help clients build their vision and convert estimates into booked projects.',
    requirements: [
      'Sales or retail experience; home improvement industry a plus',
      'Comfortable discussing materials, finishes, and pricing',
      'Genuine interest in interior design and renovation',
      'Strong listening and consultative communication style',
      'Proficiency with basic computer tools',
    ],
    accent: 'blue',
  },
  {
    id:         'general-laborer',
    title:      'General Laborer / Construction Helper',
    department: 'Field Production',
    type:       'Full-Time',
    location:   'Easton, PA (field-based)',
    pay:        'Competitive — DOE',
    summary:
      'Support field crews on active job sites — material handling, demolition cleanup, site preparation, and tool staging. This is a great entry point for someone looking to grow into a skilled trade with an established team.',
    requirements: [
      'Ability to perform physical labor in varying site conditions',
      'Punctual, reliable, and coachable',
      'Some prior construction site exposure preferred',
      'Valid driver\'s license',
      'Must be authorized to work in the US',
    ],
    accent: 'red',
  },
];

const TESTIMONIALS = [
  {
    name: 'Tony',
    role: 'Lead Project Manager',
    quote: 'Every project is different — that keeps the work interesting. The ownership here actually listens when you bring a problem to them.',
  },
  {
    name: 'Chris',
    role: 'Showroom Manager',
    quote: 'I get to help people visualize their dream home every single day. The client reactions when a project comes together make it worth it.',
  },
  {
    name: 'James',
    role: 'Project Coordinator',
    quote: 'Sure-Fix took a chance on me early in my career. The mentorship here is real — not just something written on the about page.',
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function RoleCard({
  role,
  index,
  onApply,
}: {
  role: Role;
  index: number;
  onApply: (position: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const accent = role.accent === 'blue' ? BLUE : RED;

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      {/* Header row — always visible */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-start gap-4 p-5 text-left sm:p-6 hover:bg-slate-50/70 transition-colors"
      >
        <span
          className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `${accent}18` }}
        >
          <Briefcase size={17} style={{ color: accent }} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="text-[10px] font-black uppercase tracking-[0.26em]"
              style={{ color: accent, fontFamily: SANS }}
            >
              {role.department}
            </span>
            <span className="text-slate-300">·</span>
            <span
              className="text-[10px] font-semibold uppercase tracking-wide text-slate-500"
              style={{ fontFamily: SANS }}
            >
              {role.type}
            </span>
          </div>
          <h3
            className="text-lg font-black leading-snug text-slate-900 sm:text-xl"
            style={{ fontFamily: SANS }}
          >
            {role.title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500" style={{ fontFamily: SANS }}>
              <MapPin size={11} /> {role.location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700" style={{ fontFamily: SANS }}>
              <Clock size={11} style={{ color: accent }} /> {role.pay}
            </span>
          </div>
        </div>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-1 shrink-0 text-slate-400"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-6"
              style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}
            >
              <p className="mb-5 text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
                {role.summary}
              </p>

              <p
                className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-slate-500"
                style={{ fontFamily: SANS }}
              >
                What We're Looking For
              </p>
              <ul className="mb-6 space-y-2">
                {role.requirements.map(req => (
                  <li key={req} className="flex items-start gap-2.5 text-sm text-slate-700" style={{ fontFamily: SANS }}>
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: accent }} />
                    {req}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onApply(role.title)}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                style={{ background: accent, fontFamily: SANS }}
              >
                <Send size={13} /> Apply for This Role
              </button>
              <p className="mt-2 text-[10px] text-slate-400" style={{ fontFamily: SANS }}>
                Opens our quick application form — or call us at{' '}
                <a href={BUSINESS.phoneHref} className="font-bold text-[#394696] hover:underline">
                  {BUSINESS.phone}
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Careers() {
  const [appOpen, setAppOpen] = useState(false);
  const [appPosition, setAppPosition] = useState<string>(GENERAL_APPLICATION);

  const openApplication = (position: string) => {
    setAppPosition(position || GENERAL_APPLICATION);
    setAppOpen(true);
  };

  useSeo({
    ...PAGE_SEO.careers,
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Careers', path: '/careers' },
      ]),
      ...OPEN_ROLES.map(role => ({
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: role.title,
        description: role.summary,
        datePosted: '2026-01-01',
        employmentType: 'FULL_TIME',
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '2015 Freemansburg Ave',
            addressLocality: 'Easton',
            addressRegion: 'PA',
            postalCode: '18042',
            addressCountry: 'US',
          },
        },
        hiringOrganization: {
          '@type': 'Organization',
          name: 'Sure-Fix Remodeling',
          sameAs: 'https://surefixremodelinglv.com',
        },
      })),
    ],
  });

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 65% 75% at 85% 0%, rgba(57,70,150,0.20) 0%, transparent 60%), radial-gradient(ellipse 55% 65% at 0% 100%, rgba(152,54,49,0.12) 0%, transparent 65%)',
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

            <motion.div
              variants={fadeUp}
              custom={0}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#394696]/40 px-3 py-1.5"
              style={{ background: 'rgba(57,70,150,0.10)', fontFamily: SANS }}
            >
              <Briefcase size={12} className="text-[#394696]" />
              <span className="text-[10px] font-black uppercase tracking-[0.32em] text-[#394696]">
                We're Hiring · Easton, PA
              </span>
            </motion.div>

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
              <span className="block italic font-normal">Build a career</span>
              <span className="block font-light">you can point to with pride.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mb-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Sure-Fix Remodeling has been a fixture in the Lehigh Valley since 2008. We are a family-run
              design-build firm looking for skilled tradespeople, project coordinators, and
              sales consultants who take their work personally — the same way we do.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap items-center gap-3">
              <a
                href="#open-roles"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-lg shadow-black/20 transition-opacity hover:opacity-90"
                style={{ background: BLUE, fontFamily: SANS }}
              >
                View Open Roles <ArrowRight size={14} />
              </a>
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

      {/* ── WHY JOIN US ──────────────────────────────────────────────────── */}
      <section className="border-y border-slate-200" style={{ background: 'rgba(57,70,150,0.04)' }}>
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
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#394696]"
              style={{ fontFamily: SANS }}
            >
              Why Sure-Fix
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
              A team that treats <span className="italic">every project</span> like it's their own home.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-2xl text-base leading-relaxed text-slate-600"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              We have spent nearly two decades earning a reputation in this community. The people on
              our crew are the reason for it — and we take care of them accordingly.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  variants={fadeUp}
                  custom={i}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-6"
                  style={{ background: 'linear-gradient(155deg, #ffffff 0%, #f8fafc 100%)' }}
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `${b.accent}18` }}
                  >
                    <Icon size={20} style={{ color: b.accent }} />
                  </span>
                  <div>
                    <h3
                      className="mb-2 text-base font-black text-slate-900"
                      style={{ fontFamily: SANS }}
                    >
                      {b.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
                      {b.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── OPEN ROLES ───────────────────────────────────────────────────── */}
      <section id="open-roles" className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
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
            Open Positions
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
            Roles we are <span className="italic">actively filling</span> right now.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="max-w-2xl text-base leading-relaxed text-slate-600"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Click any role to see the full description and requirements. To apply, hit the button and
            fill out our quick on-site application — no résumé required to start the conversation.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="flex flex-col gap-3"
        >
          {OPEN_ROLES.map((role, i) => (
            <RoleCard key={role.id} role={role} index={i} onApply={openApplication} />
          ))}
        </motion.div>
      </section>

      {/* ── TEAM VOICES ──────────────────────────────────────────────────── */}
      <section className="border-y border-slate-200" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="mb-12 text-center"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#394696]"
              style={{ fontFamily: SANS }}
            >
              Hear from the Team
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-slate-900"
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(1.85rem, 4vw, 2.6rem)',
                letterSpacing: '-0.02em',
              }}
            >
              The people who already <span className="italic">work here.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-1 gap-5 md:grid-cols-3"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={i}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-7"
                style={{ background: '#ffffff' }}
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={13} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p
                  className="flex-1 text-base italic leading-relaxed text-slate-700"
                  style={{ fontFamily: SERIF, fontWeight: 400, fontSize: '1.1rem' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-sm font-black text-slate-900" style={{ fontFamily: SANS }}>
                    {t.name}
                  </p>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#394696]"
                    style={{ fontFamily: SANS }}
                  >
                    {t.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── APPLICATION CTA ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[#394696]/25 p-8 text-center sm:p-12 lg:p-16"
          style={{
            background: 'linear-gradient(135deg, rgba(57,70,150,0.12) 0%, rgba(13,17,23,0.06) 50%, rgba(152,54,49,0.08) 100%)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{ background: 'rgba(57,70,150,0.3)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: 'rgba(152,54,49,0.3)' }}
          />

          <div className="relative">
            <p
              className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#394696]"
              style={{ fontFamily: SANS }}
            >
              Don't see the right fit?
            </p>
            <h2
              className="mb-4 text-slate-900"
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(1.85rem, 4vw, 3rem)',
                letterSpacing: '-0.022em',
                lineHeight: 1.06,
              }}
            >
              Send us your story <span className="italic">anyway.</span>
            </h2>
            <p
              className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-slate-600"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              We grow our team based on people, not just open slots. If you are serious about your
              craft and want to work with a team that respects it, reach out — we read every email.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => openApplication(GENERAL_APPLICATION)}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-2xl px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-black/20 transition-opacity hover:opacity-90"
                style={{ background: RED, fontFamily: SANS }}
              >
                <Send size={15} /> Submit a General Application
              </button>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-2xl border border-slate-300 bg-white px-8 py-4 text-sm font-black uppercase tracking-wider text-slate-800 transition-colors hover:bg-slate-50"
                style={{ fontFamily: SANS }}
              >
                <Phone size={15} /> {BUSINESS.phone}
              </a>
            </div>

            <p
              className="mt-6 text-xs text-slate-500"
              style={{ fontFamily: SANS }}
            >
              {BUSINESS.address} · Mon–Fri 8AM–7PM · Sat 8AM–4PM · Sun Closed
            </p>
          </div>
        </motion.div>
      </section>

      <CareerApplicationModal
        isOpen={appOpen}
        onClose={() => setAppOpen(false)}
        positions={OPEN_ROLES.map(r => r.title)}
        initialPosition={appPosition}
      />

    </div>
  );
}
