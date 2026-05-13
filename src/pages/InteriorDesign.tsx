/**
 * Interior Design Page — Sure-Fix Remodeling x Audra Frank Associates
 * Design: Modern Futuristic Craftsman
 * Theme: Dark navy (#0d1117) bg, French Blue (#394696) primary, Brown Red (#983631) accent
 * Typography: Figtree 700-900 display, Georgia serif body
 * Features: Scrolling client logo banner, certifications grid, press section, services list
 */

import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'wouter'
import { ArrowRight, Award, BookOpen, Phone, Quote, Star } from 'lucide-react'
import { useLeadStepper } from '@/contexts/LeadStepperContext'

// Audra Frank client list (from audrafrankassociates.com)
const NOTABLE_CLIENTS = [
  'Meryl Streep', 'Paul Simon', 'Sting', 'Keith Richards', 'Jasper Johns',
  'Lorne Michaels', 'Olympia Dukakis', 'Garrison Keillor', 'George Soros',
  'Lou Dobbs', 'Rupert Murdoch', 'Kate Burton', 'Howell Raines',
  'MTV Networks', 'Viacom International', 'Starbucks Coffee Company',
  'Comedy Central', 'Showtime Networks', 'Japan Airlines',
  'The Princeton Club', 'NBA Players Association',
  'Kaufman Astoria Studios', 'Todd AO Studios',
  'The Cloisters / Metropolitan Museum of Art',
  'Newsweek', 'Family Circle Magazine',
  'Jed Johnson & Associates', 'Donghia Associates',
  'Stark Carpet Corp.', 'Midtown Realty Company',
]

const CERTIFICATIONS = [
  { title: 'PDCA MAC University', subtitle: 'Painting & Decorating Contractors of America — Middle Atlantic Council President', icon: '🏛️' },
  { title: 'USGBC Member', subtitle: 'U.S. Green Building Council — Sustainable Building Practices', icon: '🌿' },
  { title: 'ASID Industry Partner', subtitle: 'American Society of Interior Designers — NJ Chapter', icon: '🎨' },
  { title: 'AIA NJ Industry Partner', subtitle: 'American Institute of Architects — New Jersey Chapter', icon: '📐' },
  { title: 'NGPP Member', subtitle: 'National Guild of Professional Paperhangers', icon: '📋' },
  { title: 'Roos International Preferred Contractor', subtitle: 'Certified preferred contractor for Roos International wallcoverings', icon: '✅' },
  { title: 'Wolman Certified Contractor', subtitle: 'Certified applicator for Wolman exterior wood care products', icon: '🔨' },
  { title: 'Rust-Oleum Approved Applicator', subtitle: 'Approved applicator for Rust-Oleum specialty coatings', icon: '🎯' },
  { title: 'Lead Awareness Training', subtitle: 'EPA Lead-Safe Certified — protecting your family during renovations', icon: '🛡️' },
  { title: 'Flood Certified Contractor', subtitle: 'Certified applicator for Flood wood care and restoration products', icon: '💧' },
]

const PRESS = [
  {
    publication: 'The New York Times',
    description: 'Thursday Home section — featured work at the Rupert Murdoch residence',
    icon: '📰',
    color: '#394696',
  },
  {
    publication: 'House Beautiful',
    description: 'Featured installation at the John and Andrea Stark (Stark Carpet) residence',
    icon: '🏡',
    color: '#983631',
  },
  {
    publication: 'Architectural Digest',
    description: 'Featured work at the Steven and Candice Stark (Stark Carpet) residence',
    icon: '🏛️',
    color: '#394696',
  },
  {
    publication: 'Elle Decor',
    description: 'Featured installation at the Schraeger residence',
    icon: '✨',
    color: '#983631',
  },
  {
    publication: 'NJ Monthly',
    description: '"Painted Walls" — featured Audra and David Frank residence',
    icon: '📖',
    color: '#394696',
  },
  {
    publication: 'Benjamin Moore Profile Magazine',
    description: 'Featured as a leading eco-friendly painting and decorating professional',
    icon: '🎨',
    color: '#983631',
  },
]

const SERVICES = [
  {
    title: 'Interior Color Consultation',
    description: 'Expert color selection for every room — walls, trim, ceilings, and accents — tailored to your home\'s architecture and your personal style.',
  },
  {
    title: 'Decorative Finishes',
    description: 'Glazing, faux marble, Venetian plaster, stenciling, and specialty finishes that transform ordinary walls into works of art.',
  },
  {
    title: 'Wallpaper & Wall Coverings',
    description: 'Installation of premium wallpapers, grasscloth, fabric wall coverings, and murals. We use only PVC-free, eco-friendly materials.',
  },
  {
    title: 'Material & Finish Selection',
    description: 'Guided selection of countertops, tile, flooring, cabinetry hardware, and fixtures — coordinated across your entire project for a cohesive look.',
  },
  {
    title: 'Space Planning & Layout',
    description: 'Furniture placement, traffic flow optimization, and spatial design to make every room feel intentional and livable.',
  },
  {
    title: 'Eco-Friendly Design',
    description: 'Audra is passionate about indoor air quality. All paints are No or Low VOC. All adhesives and cleaning products are environmentally friendly.',
  },
]

// Infinite scrolling ticker for client names
function ClientTicker() {
  const baseX = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)

  useAnimationFrame((t, delta) => {
    const moveBy = -0.04 * delta
    let newX = baseX.get() + moveBy
    if (tickerRef.current) {
      const width = tickerRef.current.scrollWidth / 2
      if (Math.abs(newX) >= width) newX = 0
    }
    baseX.set(newX)
  })

  const doubled = [...NOTABLE_CLIENTS, ...NOTABLE_CLIENTS]

  return (
    <div ref={containerRef} className="overflow-hidden py-4 relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0d1117] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0d1117] to-transparent z-10 pointer-events-none" />
      <motion.div ref={tickerRef} style={{ x: baseX }} className="flex gap-6 whitespace-nowrap">
        {doubled.map((client, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#394696] flex-shrink-0" />
            {client}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function InteriorDesign() {
  const { openStepper } = useLeadStepper()
  const [activeService, setActiveService] = useState(0)

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24 pb-16">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `radial-gradient(circle at 70% 30%, #394696 0%, transparent 50%), radial-gradient(circle at 20% 80%, #983631 0%, transparent 40%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(#394696 1px, transparent 1px), linear-gradient(90deg, #394696 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#983631]/20 border border-[#983631]/40 text-[#c44a44] text-sm font-semibold tracking-wider uppercase mb-6"
            >
              <Star className="w-4 h-4 fill-current" />
              In-House Interior Design
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-white mb-6 leading-none tracking-tight"
              style={{ fontFamily: 'Figtree, sans-serif' }}
            >
              DESIGN MEETS
              <br />
              <span className="text-[#394696]">CRAFTSMANSHIP</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-6 leading-relaxed"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Sure-Fix Remodeling is proud to partner with <strong className="text-white">Audra Frank Associates</strong> — bringing 50+ years of elite interior design experience directly to your renovation project.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-gray-400 mb-8 leading-relaxed"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Audra E. Frank has worked with some of the most discerning clients in the world — from Meryl Streep and Paul Simon to Rupert Murdoch and George Soros — and her work has been featured in Architectural Digest, House Beautiful, Elle Decor, and The New York Times.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                type="button"
                onClick={() => openStepper('design')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-[#983631] text-white font-black text-lg rounded-xl hover:bg-[#c44a44] transition-colors shadow-lg shadow-[#983631]/30"
                style={{ fontFamily: 'Figtree, sans-serif', border: 'none' }}
              >
                Book a Design Consultation
              </motion.button>

            </motion.div>
          </div>

          {/* Right — Profile card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#394696]/20 to-[#0d1117] p-8">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#394696]/20 rounded-bl-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#983631]/10 rounded-tr-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#394696] flex items-center justify-center text-2xl font-black text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>
                    AF
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>Audra E. Frank</h3>
                    <p className="text-[#394696] font-semibold text-sm">President, Audra Frank Associates LLC</p>
                  </div>
                </div>

                <blockquote className="text-gray-300 italic leading-relaxed mb-6 border-l-2 border-[#394696] pl-4" style={{ fontFamily: 'Georgia, serif' }}>
                  "For fifty years, I've believed that great design begins with listening — understanding how you live, what you love, and what will make your home feel truly yours."
                </blockquote>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Years Experience', value: '50+' },
                    { label: 'Notable Clients', value: '40+' },
                    { label: 'Press Features', value: '6' },
                    { label: 'Certifications', value: '10+' },
                  ].map(stat => (
                    <div key={stat.label} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl font-black text-[#394696]" style={{ fontFamily: 'Figtree, sans-serif' }}>{stat.value}</div>
                      <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {['USGBC', 'PDCA', 'ASID', 'NGPP', 'AIA NJ'].map(org => (
                    <span key={org} className="px-3 py-1 text-xs font-bold bg-[#394696]/20 text-[#7b8fd4] rounded-full border border-[#394696]/30">
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Interior Design <span className="text-[#394696]">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
              Integrated with your Sure-Fix renovation from day one — so design and construction move together, not against each other.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#394696]/50 hover:bg-[#394696]/5 transition-all cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-[#394696]/20 flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#394696]" />
                </div>
                <h3 className="text-lg font-black text-white mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Clients Ticker */}
      <section className="py-16 border-t border-white/10 bg-[#0a0e14]">
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>
              A Few <span className="text-[#394696]">Notable Clients</span>
            </h2>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
              Audra Frank Associates has served some of the world's most discerning clients for over 50 years.
            </p>
          </motion.div>
        </div>
        <ClientTicker />
      </section>

      {/* Press & Publications */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-4">
              <BookOpen className="w-8 h-8 text-[#394696]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Press & <span className="text-[#394696]">Publications</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
              Audra Frank's work has been recognized by the world's most prestigious design publications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRESS.map((item, i) => (
              <motion.div
                key={item.publication}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 overflow-hidden group hover:border-white/20 transition-all"
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                  style={{ backgroundColor: item.color }}
                />
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-black text-white mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>
                  {item.publication}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 px-4 bg-[#0a0e14] border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-4">
              <Award className="w-8 h-8 text-[#983631]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Certifications & <span className="text-[#394696]">Credentials</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
              Audra Frank Associates holds more than 10 professional certifications and is an active member of the industry's leading organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#394696]/40 transition-all"
              >
                <span className="text-2xl flex-shrink-0">{cert.icon}</span>
                <div>
                  <h3 className="font-black text-white text-sm mb-1" style={{ fontFamily: 'Figtree, sans-serif' }}>
                    {cert.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    {cert.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-br from-[#394696]/20 to-[#983631]/10 border border-white/10"
          >
            <Quote className="w-8 h-8 text-[#394696] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Start Your Design Journey
            </h2>
            <p className="text-gray-300 text-lg mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              Book a free consultation with Audra Frank and the Sure-Fix team. We'll walk through your space, understand your vision, and create a plan that brings it to life — beautifully and on budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                type="button"
                onClick={() => openStepper('design')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-[#983631] text-white font-black text-lg rounded-xl hover:bg-[#c44a44] transition-colors shadow-lg shadow-[#983631]/30 flex items-center gap-2 justify-center"
                style={{ fontFamily: 'Figtree, sans-serif', border: 'none' }}
              >
                Book Free Consultation <ArrowRight className="w-5 h-5" />
              </motion.button>
              <a href="tel:6103920990">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 border-2 border-[#394696] text-[#7b8fd4] font-bold text-lg rounded-xl hover:bg-[#394696]/10 transition-all flex items-center gap-2 justify-center"
                >
                  <Phone className="w-5 h-5" /> (610) 392-0990
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
