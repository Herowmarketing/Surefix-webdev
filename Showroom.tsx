/**
 * SHOWROOM PAGE — Sure-Fix Remodeling
 * Design: Dark navy, cinematic 3D interactive material showcase
 * Features: Interactive3DMaterial cards (cursor-tilt, press spring, scroll parallax)
 * Brand: French Blue #394696, Brown Red #983631, Deep Navy #0d1117
 */
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'wouter'
import { useRef } from 'react'
import { ArrowRight, CheckCircle, Star, Layers, Wrench, Home, Award, ShieldCheck, Droplets } from 'lucide-react'
import { Interactive3DMaterial, Interactive3DMaterialFeatured } from '@/components/Interactive3DMaterial'
import { BUSINESS } from '@/lib/constants'
import { SHOWROOM_MATERIAL_IMAGES, SHOWROOM_HOME_VIDEO_SRC } from '@/lib/site-images'
import { useLeadStepper } from '@/contexts/LeadStepperContext'
import { useSeo, breadcrumbList, LOCAL_BUSINESS_ID } from '@/lib/seo'
import { PAGE_SEO } from '@/lib/seo-config'

const FEATURED_MATERIALS = [
  {
    id: 'countertops',
    title: 'Countertops & Surfaces',
    badge: 'Kitchen & Bath',
    description: 'From dramatic Calacatta marble to engineered quartz and butcher block, our showroom carries the full spectrum of countertop surfaces. Touch and compare slabs in person before you commit.',
    features: ['Quartz', 'Marble', 'Granite', 'Quartzite', 'Butcher Block'],
    brands: ['Cambria', 'Silestone', 'MSI', 'Caesarstone'],
    imageUrl: SHOWROOM_MATERIAL_IMAGES.countertop,
    accentColor: '#394696',
    flipped: false,
  },
  {
    id: 'flooring',
    title: 'Flooring & Hardwood',
    badge: 'Flooring',
    description: "Hardwood, luxury vinyl plank, porcelain tile, and carpet — all under one roof. We carry Woodura's industry-leading sustainable hardwood collection alongside premium LVP lines that stand up to real family life.",
    features: ['Hardwood', 'LVP', 'Porcelain', 'Carpet', 'Cork'],
    brands: ['Woodura', 'Shaw', 'Mohawk', 'Adura'],
    imageUrl: SHOWROOM_MATERIAL_IMAGES.flooring,
    accentColor: '#983631',
    flipped: true,
  },
  {
    id: 'tile',
    title: 'Tile & Stone',
    badge: 'Bath & Kitchen',
    description: 'Large-format porcelain, handmade ceramic, natural stone mosaics, and glass subway tile. Our tile wall spans hundreds of options — from minimalist matte to dramatic veined slabs.',
    features: ['Porcelain', 'Ceramic', 'Natural Stone', 'Glass', 'Mosaic'],
    brands: ['Daltile', 'MSI', 'Florida Tile', 'Emser'],
    imageUrl: SHOWROOM_MATERIAL_IMAGES.tile,
    accentColor: '#394696',
    flipped: false,
  },
  {
    id: 'plumbing',
    title: 'Fixtures & Faucets',
    badge: 'Plumbing',
    description: 'Kohler, Moen, Delta, and Hansgrohe — all on display and ready to touch. Compare finishes from brushed nickel to matte black. Our team helps you pair fixtures to your tile and countertop selections.',
    features: ['Kitchen Faucets', 'Bath Faucets', 'Shower Systems', 'Tubs', 'Toilets'],
    brands: ['Kohler', 'Moen', 'Delta', 'Hansgrohe'],
    imageUrl: SHOWROOM_MATERIAL_IMAGES.faucet,
    accentColor: '#983631',
    flipped: true,
  },
  {
    id: 'shower',
    title: 'Shower Enclosures & Doors',
    badge: 'Bathroom',
    description: 'Frameless glass, semi-frameless, and full shower systems — including steam units and walk-in wet rooms. Complete shower packages from pan to ceiling so your bathroom renovation stays on schedule.',
    features: ['Frameless Glass', 'Steam Units', 'Walk-In', 'Wet Rooms', 'Custom Sizes'],
    brands: ['Kohler', 'DreamLine', 'MAAX', 'Basco'],
    imageUrl: SHOWROOM_MATERIAL_IMAGES.shower,
    accentColor: '#394696',
    flipped: false,
  },
  {
    id: 'exterior',
    title: 'Siding & Roofing',
    badge: 'Exterior',
    description: "James Hardie fiber cement, vinyl siding, and cedar shake — plus GAF and CertainTeed roofing systems. Sourced from the most trusted manufacturers and backed by full warranties.",
    features: ['Fiber Cement', 'Vinyl Siding', 'Cedar Shake', 'GAF Roofing', 'CertainTeed'],
    brands: ['James Hardie', 'GAF', 'CertainTeed', 'LP SmartSide'],
    imageUrl: SHOWROOM_MATERIAL_IMAGES.siding,
    accentColor: '#983631',
    flipped: true,
  },
]

const GRID_MATERIALS = [
  { title: 'Roofing Shingles', badge: 'Exterior', imageUrl: SHOWROOM_MATERIAL_IMAGES.roofing, accentColor: '#394696' },
  { title: 'Luxury Vinyl Plank', badge: 'Flooring', imageUrl: SHOWROOM_MATERIAL_IMAGES.lvp, accentColor: '#983631' },
  { title: 'Shower Systems', badge: 'Bathroom', imageUrl: SHOWROOM_MATERIAL_IMAGES.shower, accentColor: '#394696' },
]

const PARTNER_BRANDS = [
  { name: 'Moen', category: 'Plumbing · Enduring Ally' },
  { name: 'Gerber', category: 'Toilets · Enduring Ally' },
  { name: 'Forevermark Cabinetry', category: 'Cabinetry · Enduring Ally' },
  { name: 'GAF', category: 'Roofing · Certified Installer' },
  { name: 'BCI Acrylic', category: 'Bath · Certified Installer' },
  { name: 'Woodura', category: 'Flooring' },
  { name: 'Kohler', category: 'Plumbing' },
  { name: 'James Hardie', category: 'Exterior' },
  { name: 'CertainTeed', category: 'Roofing' },
  { name: 'Cambria', category: 'Countertops' },
  { name: 'Silestone', category: 'Countertops' },
  { name: 'Shaw', category: 'Flooring' },
  { name: 'Mohawk', category: 'Flooring' },
  { name: 'DreamLine', category: 'Bath' },
  { name: 'Daltile', category: 'Tile' },
  { name: 'MSI', category: 'Tile' },
  { name: 'Delta', category: 'Plumbing' },
  { name: 'Hansgrohe', category: 'Plumbing' },
  { name: 'Andersen', category: 'Windows' },
]

/** Enduring Brand Allies bundle — long-standing manufacturer relationships highlighted
 *  separately from the wider marquee. Marketing brief, 2026 Q1.                                       */
const ENDURING_ALLIES = [
  {
    name: 'Moen',
    role: 'Plumbing fixtures',
    icon: Droplets,
    certified: false,
    blurb:
      'Lifetime-rated finishes, spec-matched valves, and faucet families our crews install every week. Moen sits inside our standard kitchen and bath packages so what you choose on the showroom floor is what shows up at install.',
  },
  {
    name: 'Gerber',
    role: 'High-efficiency toilets',
    icon: ShieldCheck,
    certified: false,
    blurb:
      'Performance-grade toilets that solve real renovation problems — quiet flush, rough-in flexibility, and water-saving ratings that satisfy modern code without sacrificing comfort.',
  },
  {
    name: 'Forevermark Cabinetry',
    role: 'Kitchen & bath cabinetry',
    icon: Layers,
    certified: false,
    blurb:
      'Dovetail-box construction, soft-close hardware, and dozens of door styles — Forevermark delivers real-wood cabinetry at attainable price points that hold up in everyday family kitchens and bathrooms.',
  },
  {
    name: 'GAF',
    role: 'GAF Certified Installer',
    icon: Award,
    certified: true,
    blurb:
      'As GAF Certified installers, we apply GAF roofing systems to manufacturer specification and back them with the full warranty that certified installation provides — the kind of coverage a standard referral contractor cannot offer.',
  },
  {
    name: 'BCI Acrylic',
    role: 'BCI Certified Installer',
    icon: Star,
    certified: true,
    blurb:
      'BCI Acrylic bath systems are purpose-built for lasting durability and a clean, finished look. As BCI Certified installers, we handle precise measurement, factory ordering, and professional installation as one seamless process.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

export default function Showroom() {
  const { openStepper } = useLeadStepper()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })

  useSeo({
    ...PAGE_SEO.showroom,
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Showroom', path: '/showroom' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: 'Sure-Fix Remodeling Showroom',
        url: 'https://surefixremodelinglv.com/showroom',
        containedInPlace: { '@id': LOCAL_BUSINESS_ID },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '2015 Freemansburg Ave',
          addressLocality: 'Easton',
          addressRegion: 'PA',
          postalCode: '18042',
          addressCountry: 'US',
        },
      },
    ],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="bg-white min-h-screen">

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(57,70,150,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(57,70,150,0.04) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(57,70,150,0.15) 0%, transparent 70%)' }} />
        </motion.div>

        {/* Floating background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { src: SHOWROOM_MATERIAL_IMAGES.countertop, x: '72%', y: '15%', size: 200, delay: 0 },
            { src: SHOWROOM_MATERIAL_IMAGES.tile, x: '82%', y: '62%', size: 140, delay: 0.3 },
            { src: SHOWROOM_MATERIAL_IMAGES.siding, x: '4%', y: '68%', size: 120, delay: 0.6 },
          ].map((orb, i) => (
            <motion.div key={i} className="absolute rounded-2xl overflow-hidden border border-slate-200"
              style={{ left: orb.x, top: orb.y, width: orb.size, height: orb.size, opacity: 0.22, filter: 'blur(1px)' }}
              animate={{ y: [0, -20, 0], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}>
              <img src={orb.src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 pt-32 pb-20">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#394696]/40 mb-6"
              style={{ background: 'rgba(57,70,150,0.12)' }}>
              <Layers size={12} className="text-[#394696]" />
              <span className="text-xs font-bold text-[#394696] uppercase tracking-widest" style={{ fontFamily: 'Figtree, sans-serif' }}>
                In-House Material Showroom · Easton, PA
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-6xl xl:text-7xl font-black text-slate-900 leading-[0.95] mb-6"
              style={{ fontFamily: 'Figtree, sans-serif' }}>
              EVERYTHING<br />
              <span style={{ color: '#394696' }}>UNDER ONE</span><br />
              ROOF.
            </motion.h1>

            <motion.p variants={fadeUp} custom={2}
              className="text-lg text-slate-600 max-w-xl leading-relaxed mb-8"
              style={{ fontFamily: 'Georgia, serif' }}>
              No Home Depot runs. No Lowe's trips. No chasing down materials from three different vendors.
              Our showroom carries every material your renovation needs — all in stock and ready to touch.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4 mb-10">
              {['Countertops & Surfaces', 'Flooring & Hardwood', 'Tile & Stone', 'Fixtures & Faucets', 'Siding & Roofing', 'Windows & Doors'].map(item => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-slate-600" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                  <CheckCircle size={14} className="text-[#394696]" /> {item}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
              <motion.button
                type="button"
                onClick={() => openStepper()}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-black text-slate-900 cursor-pointer uppercase tracking-wider"
                style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', boxShadow: '0 8px 32px rgba(152,54,49,0.4)', border: 'none' }}
              >
                Visit the Showroom <ArrowRight size={16} />
              </motion.button>
              <a href={BUSINESS.phoneHref}>
                <motion.span whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-black text-slate-900 cursor-pointer uppercase tracking-wider border border-slate-300"
                  style={{ background: '#f8fafc', fontFamily: 'Figtree, sans-serif', backdropFilter: 'blur(8px)' }}>
                  {BUSINESS.phone}
                </motion.span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── ONE-STOP-SHOP CALLOUT ─── */}
      <section className="py-16 border-y border-slate-200" style={{ background: 'rgba(57,70,150,0.05)' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Home size={24} className="text-[#394696]" />, title: 'One Stop. Start to Finish.', body: 'From your first material selection to final installation — everything happens under the Sure-Fix umbrella. No coordinating between vendors.' },
              { icon: <Layers size={24} className="text-[#394696]" />, title: 'Touch Before You Decide.', body: 'Our physical showroom lets you see, feel, and compare materials in real life — not on a screen. Walk in with questions, walk out with confidence.' },
              { icon: <Wrench size={24} className="text-[#394696]" />, title: 'In-Stock. On Schedule.', body: "Because we source and stock our own materials, your project stays on timeline. No waiting on back-ordered items from big-box stores." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="flex flex-col gap-3 p-6 rounded-2xl border border-slate-200" style={{ background: '#f8fafc' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(57,70,150,0.15)' }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-slate-900" style={{ fontFamily: 'Figtree, sans-serif' }}>{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE 3D FEATURED MATERIALS ─── */}
      <section className="py-24 px-5 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-3" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Hover · Press · Scroll to Explore
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black text-slate-900 mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Materials That Move With You
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-slate-500 max-w-xl mx-auto text-base" style={{ fontFamily: 'Georgia, serif' }}>
            Every card responds to your cursor, press, and scroll. Every item is available in our showroom today.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {FEATURED_MATERIALS.map((mat, i) => (
            <Interactive3DMaterialFeatured
              key={mat.id}
              imageUrl={mat.imageUrl}
              title={mat.title}
              badge={mat.badge}
              description={mat.description}
              features={mat.features}
              brands={mat.brands}
              accentColor={mat.accentColor}
              flipped={mat.flipped}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ─── SHOWROOM VIDEO SHOWCASE ─── */}
      <section className="py-16 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 text-center"
          >
            <p
              className="mb-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#394696]"
              style={{ fontFamily: 'Figtree, sans-serif' }}
            >
              Take a Look Inside
            </p>
            <h3
              className="text-slate-900"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 300,
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                letterSpacing: '-0.02em',
              }}
            >
              Also In Our <span className="italic">Showroom</span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-2xl shadow-slate-300/40"
            style={{ background: '#0d1117' }}
          >
            {/* Subtle top accent line */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #394696, #983631, #394696, transparent)' }}
            />

            <video
              src={SHOWROOM_HOME_VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full"
              style={{ display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
            />

            {/* Bottom overlay with CTA */}
            <div
              className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end gap-4 px-6 pb-8 pt-20 sm:flex-row sm:items-end sm:justify-between sm:pb-10 sm:pt-24"
              style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.85) 0%, transparent 100%)' }}
            >
              <div>
                <p
                  className="text-xs font-black uppercase tracking-[0.3em] text-white/60"
                  style={{ fontFamily: 'Figtree, sans-serif' }}
                >
                  Sure-Fix Remodeling
                </p>
                <p
                  className="text-lg font-light text-white sm:text-xl"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', letterSpacing: '-0.01em' }}
                >
                  Visit our showroom in Easton, PA
                </p>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                style={{ background: '#983631', fontFamily: 'Figtree, sans-serif' }}
              >
                <ArrowRight size={13} /> Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── OUR ENDURING BRAND ALLIES BUNDLE ─── */}
      <section className="relative overflow-hidden border-t border-slate-200">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 70% at 90% 0%, rgba(57,70,150,0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 65% at 0% 100%, rgba(152,54,49,0.1) 0%, transparent 65%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="mb-12 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.2fr_1fr]"
          >
            <div>
              <motion.span
                variants={fadeUp}
                custom={0}
                className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#394696]/40 px-3 py-1 text-[10px] font-black uppercase tracking-[0.32em] text-slate-800"
                style={{ background: 'rgba(57,70,150,0.18)', fontFamily: 'Figtree, sans-serif' }}
              >
                <Award size={11} /> Our Enduring Brand Allies Bundle
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-slate-900"
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 300,
                  fontSize: 'clamp(2rem, 4.6vw, 3.1rem)',
                  letterSpacing: '-0.022em',
                  lineHeight: 1.06,
                }}
              >
                A <span className="italic">stack above</span> big-box stores.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Most contractors hand you a vendor list and a parking pass. Sure-Fix walks you through a curated material selection inside our showroom — fixtures by <strong className="text-slate-900">Moen</strong>, toilets by <strong className="text-slate-900">Gerber</strong>, and cabinetry by <strong className="text-slate-900">Forevermark</strong>. We're also proud <strong className="text-slate-900">GAF Certified</strong> and <strong className="text-slate-900">BCI Certified</strong> installers — manufacturer-verified credentials that back every roofing and bath system we install.
              </motion.p>
              <motion.div
                variants={fadeUp}
                custom={3}
                className="mt-6 flex flex-wrap gap-3"
              >
                <span
                  className="inline-flex items-center gap-2 rounded-2xl border border-[#394696]/30 px-4 py-2.5 text-sm"
                  style={{ background: 'rgba(57,70,150,0.08)', fontFamily: 'Figtree, sans-serif' }}
                >
                  <Award size={14} className="text-[#394696]" />
                  <span className="font-bold text-slate-900">GAF Certified Installer</span>
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-2xl border border-[#983631]/30 px-4 py-2.5 text-sm"
                  style={{ background: 'rgba(152,54,49,0.08)', fontFamily: 'Figtree, sans-serif' }}
                >
                  <Award size={14} className="text-[#983631]" />
                  <span className="font-bold text-slate-900">BCI Certified Installer</span>
                </span>
              </motion.div>
            </div>
            <motion.ul
              variants={fadeUp}
              custom={1}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1"
            >
              {ENDURING_ALLIES.map((ally) => {
                const Icon = ally.icon
                return (
                  <li
                    key={ally.name}
                    className="flex items-start gap-3 rounded-2xl border p-4"
                    style={{
                      background: ally.certified ? 'rgba(57,70,150,0.06)' : '#f8fafc',
                      borderColor: ally.certified ? 'rgba(57,70,150,0.25)' : '#e2e8f0',
                    }}
                  >
                    <span
                      className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ background: 'rgba(57,70,150,0.18)', color: '#cdd5f4' }}
                    >
                      <Icon size={15} />
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-sm font-black text-slate-900"
                        style={{ fontFamily: 'Figtree, sans-serif' }}
                      >
                        {ally.name}
                      </p>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.28em]"
                        style={{ fontFamily: 'Figtree, sans-serif', color: ally.certified ? '#983631' : '#394696' }}
                      >
                        {ally.role}
                      </p>
                    </div>
                  </li>
                )
              })}
            </motion.ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {ENDURING_ALLIES.map((ally, i) => {
              const Icon = ally.icon
              return (
                <motion.article
                  key={ally.name}
                  variants={fadeUp}
                  custom={i}
                  className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border p-7"
                  style={{
                    background: ally.certified
                      ? 'linear-gradient(155deg, #fdf8f7 0%, #faf5f4 60%, #f5eeec 100%)'
                      : 'linear-gradient(155deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%)',
                    borderColor: ally.certified ? 'rgba(152,54,49,0.25)' : '#e2e8f0',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{
                        background: ally.certified
                          ? 'linear-gradient(135deg, rgba(152,54,49,0.35), rgba(57,70,150,0.20))'
                          : 'linear-gradient(135deg, rgba(57,70,150,0.35), rgba(152,54,49,0.25))',
                        color: '#fff',
                      }}
                    >
                      <Icon size={20} />
                    </span>
                    {ally.certified ? (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.28em]"
                        style={{ background: 'rgba(152,54,49,0.12)', color: '#983631', fontFamily: 'Figtree, sans-serif' }}
                      >
                        <Award size={9} /> Certified Installer
                      </span>
                    ) : (
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500"
                        style={{ fontFamily: 'Figtree, sans-serif' }}
                      >
                        Enduring Ally
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-slate-900"
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontWeight: 400,
                      fontSize: 'clamp(1.5rem, 2.4vw, 1.85rem)',
                      letterSpacing: '-0.012em',
                      lineHeight: 1.05,
                    }}
                  >
                    {ally.name}
                  </h3>
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.32em]"
                    style={{ fontFamily: 'Figtree, sans-serif', color: ally.certified ? '#983631' : '#394696' }}
                  >
                    {ally.role}
                  </p>
                  <p
                    className="text-sm leading-relaxed text-slate-600"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {ally.blurb}
                  </p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── BRAND PARTNERS MARQUEE ─── */}
      <section className="py-16 border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-10 text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Trusted Brands We Carry
          </motion.p>
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-2xl font-black text-slate-900" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Industry-Leading Manufacturers
          </motion.h3>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #0d1117, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #0d1117, transparent)' }} />
          <motion.div className="flex gap-4 w-max" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
            {[...PARTNER_BRANDS, ...PARTNER_BRANDS].map((brand, i) => (
              <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center px-8 py-5 rounded-xl border border-slate-200 min-w-[160px]"
                style={{ background: '#f8fafc' }}>
                <span className="text-base font-black text-slate-900" style={{ fontFamily: 'Figtree, sans-serif' }}>{brand.name}</span>
                <span className="text-xs text-slate-400 mt-1" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>{brand.category}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-24 px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center rounded-3xl p-12 border border-[#394696]/30 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(57,70,150,0.15) 0%, rgba(13,17,23,0.8) 100%)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(57,70,150,0.2) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Ready to See It in Person?
            </h2>
            <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
              Visit our showroom at {BUSINESS.address}. Our team will walk you through every material option and help you design the home of your dreams — all in one visit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                type="button"
                onClick={() => openStepper()}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-black text-slate-900 cursor-pointer uppercase tracking-wider"
                style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', boxShadow: '0 8px 32px rgba(152,54,49,0.4)', border: 'none' }}
              >
                Schedule a Showroom Visit <ArrowRight size={16} />
              </motion.button>
              <a href={BUSINESS.phoneHref}>
                <motion.span whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-black text-slate-900 cursor-pointer uppercase tracking-wider border border-slate-300"
                  style={{ background: '#f8fafc', fontFamily: 'Figtree, sans-serif', backdropFilter: 'blur(8px)' }}>
                  {BUSINESS.phone}
                </motion.span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
