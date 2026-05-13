/**
 * SHOWROOM PAGE — Sure-Fix Remodeling
 * Design: Dark navy, cinematic 3D interactive material showcase
 * Features: Interactive3DMaterial cards (cursor-tilt, press spring, scroll parallax)
 * Brand: French Blue #394696, Brown Red #983631, Deep Navy #0d1117
 */
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'wouter'
import { useRef } from 'react'
import { ArrowRight, CheckCircle, Star, Layers, Wrench, Home } from 'lucide-react'
import { Interactive3DMaterial, Interactive3DMaterialFeatured } from '@/components/Interactive3DMaterial'
import { BUSINESS } from '@/lib/constants'
import { useLeadStepper } from '@/contexts/LeadStepperContext'

const FEATURED_MATERIALS = [
  {
    id: 'countertops',
    title: 'Countertops & Surfaces',
    badge: 'Kitchen & Bath',
    description: 'From dramatic Calacatta marble to engineered quartz and butcher block, our showroom carries the full spectrum of countertop surfaces. Touch and compare slabs in person before you commit.',
    features: ['Quartz', 'Marble', 'Granite', 'Quartzite', 'Butcher Block'],
    brands: ['Cambria', 'Silestone', 'MSI', 'Caesarstone'],
    imageUrl: '/manus-storage/material-countertop_90a2fefe.jpg',
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
    imageUrl: '/manus-storage/material-flooring_26579164.jpg',
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
    imageUrl: '/manus-storage/material-tile_5dffffa8.jpg',
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
    imageUrl: '/manus-storage/material-faucet_ff601050.jpg',
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
    imageUrl: '/manus-storage/material-shower_b2b35598.jpg',
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
    imageUrl: '/manus-storage/material-siding_04e1adba.jpg',
    accentColor: '#983631',
    flipped: true,
  },
]

const GRID_MATERIALS = [
  { title: 'Roofing Shingles', badge: 'Exterior', imageUrl: '/manus-storage/material-roofing_afcdda27.jpg', accentColor: '#394696' },
  { title: 'Luxury Vinyl Plank', badge: 'Flooring', imageUrl: '/manus-storage/material-lvp_c2141207.jpg', accentColor: '#983631' },
  { title: 'Shower Systems', badge: 'Bathroom', imageUrl: '/manus-storage/material-shower_b2b35598.jpg', accentColor: '#394696' },
]

const PARTNER_BRANDS = [
  { name: 'Woodura', category: 'Flooring' },
  { name: 'Kohler', category: 'Plumbing' },
  { name: 'Moen', category: 'Plumbing' },
  { name: 'James Hardie', category: 'Exterior' },
  { name: 'GAF', category: 'Roofing' },
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
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="bg-[#0d1117] min-h-screen">

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(57,70,150,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(57,70,150,0.06) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(57,70,150,0.15) 0%, transparent 70%)' }} />
        </motion.div>

        {/* Floating background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { src: '/manus-storage/material-countertop_90a2fefe.jpg', x: '72%', y: '15%', size: 200, delay: 0 },
            { src: '/manus-storage/material-tile_5dffffa8.jpg', x: '82%', y: '62%', size: 140, delay: 0.3 },
            { src: '/manus-storage/material-siding_04e1adba.jpg', x: '4%', y: '68%', size: 120, delay: 0.6 },
          ].map((orb, i) => (
            <motion.div key={i} className="absolute rounded-2xl overflow-hidden border border-white/10"
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
              className="text-5xl md:text-6xl xl:text-7xl font-black text-white leading-[0.95] mb-6"
              style={{ fontFamily: 'Figtree, sans-serif' }}>
              EVERYTHING<br />
              <span style={{ color: '#394696' }}>UNDER ONE</span><br />
              ROOF.
            </motion.h1>

            <motion.p variants={fadeUp} custom={2}
              className="text-lg text-white/60 max-w-xl leading-relaxed mb-8"
              style={{ fontFamily: 'Georgia, serif' }}>
              No Home Depot runs. No Lowe's trips. No chasing down materials from three different vendors.
              Our showroom carries every material your renovation needs — all in stock and ready to touch.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4 mb-10">
              {['Countertops & Surfaces', 'Flooring & Hardwood', 'Tile & Stone', 'Fixtures & Faucets', 'Siding & Roofing', 'Windows & Doors'].map(item => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-white/60" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
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
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider"
                style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', boxShadow: '0 8px 32px rgba(152,54,49,0.4)', border: 'none' }}
              >
                Visit the Showroom <ArrowRight size={16} />
              </motion.button>
              <a href={BUSINESS.phoneHref}>
                <motion.span whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider border border-white/20"
                  style={{ background: 'rgba(255,255,255,0.05)', fontFamily: 'Figtree, sans-serif', backdropFilter: 'blur(8px)' }}>
                  {BUSINESS.phone}
                </motion.span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── ONE-STOP-SHOP CALLOUT ─── */}
      <section className="py-16 border-y border-white/8" style={{ background: 'rgba(57,70,150,0.07)' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Home size={24} className="text-[#394696]" />, title: 'One Stop. Start to Finish.', body: 'From your first material selection to final installation — everything happens under the Sure-Fix umbrella. No coordinating between vendors.' },
              { icon: <Layers size={24} className="text-[#394696]" />, title: 'Touch Before You Decide.', body: 'Our physical showroom lets you see, feel, and compare materials in real life — not on a screen. Walk in with questions, walk out with confidence.' },
              { icon: <Wrench size={24} className="text-[#394696]" />, title: 'In-Stock. On Schedule.', body: "Because we source and stock our own materials, your project stays on timeline. No waiting on back-ordered items from big-box stores." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="flex flex-col gap-3 p-6 rounded-2xl border border-white/8" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(57,70,150,0.15)' }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{item.body}</p>
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
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Materials That Move With You
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-white/50 max-w-xl mx-auto text-base" style={{ fontFamily: 'Georgia, serif' }}>
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

      {/* ─── COMPACT 3D GRID ─── */}
      <section className="py-16 px-5 lg:px-8 max-w-7xl mx-auto">
        <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-2xl font-black text-white mb-10 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
          Also In Our Showroom
        </motion.h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {GRID_MATERIALS.map((mat, i) => (
            <Interactive3DMaterial key={mat.title} imageUrl={mat.imageUrl} title={mat.title} badge={mat.badge} accentColor={mat.accentColor} index={i} />
          ))}
        </div>
      </section>

      {/* ─── BRAND PARTNERS MARQUEE ─── */}
      <section className="py-16 border-t border-white/8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-10 text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-white/30 mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Trusted Brands We Carry
          </motion.p>
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-2xl font-black text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Industry-Leading Manufacturers
          </motion.h3>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #0d1117, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #0d1117, transparent)' }} />
          <motion.div className="flex gap-4 w-max" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
            {[...PARTNER_BRANDS, ...PARTNER_BRANDS].map((brand, i) => (
              <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center px-8 py-5 rounded-xl border border-white/8 min-w-[160px]"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <span className="text-base font-black text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>{brand.name}</span>
                <span className="text-xs text-white/30 mt-1" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>{brand.category}</span>
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
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Ready to See It in Person?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
              Visit our showroom at {BUSINESS.address}. Our team will walk you through every material option and help you design the home of your dreams — all in one visit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                type="button"
                onClick={() => openStepper()}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider"
                style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', boxShadow: '0 8px 32px rgba(152,54,49,0.4)', border: 'none' }}
              >
                Schedule a Showroom Visit <ArrowRight size={16} />
              </motion.button>
              <a href={BUSINESS.phoneHref}>
                <motion.span whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider border border-white/20"
                  style={{ background: 'rgba(255,255,255,0.05)', fontFamily: 'Figtree, sans-serif', backdropFilter: 'blur(8px)' }}>
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
