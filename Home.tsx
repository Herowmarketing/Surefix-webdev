/*
 * HOME PAGE — Sure-Fix Remodeling
 * Design: High-converting, minimal scrolling, cinematic scroll-scrubbed hero, real business info
 * Sections: CinematicHero → Social Proof Bar → Services Grid → Why Us → Reviews → CTA Banner
 */
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Phone, ArrowRight, Star, Shield, Award, Clock, CheckCircle } from 'lucide-react';
import { BUSINESS, SERVICES, REVIEWS } from '@/lib/constants';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { SHOWROOM_HOME_IMAGE, SITE_IMAGES } from '@/lib/site-images';
import CinematicHero from './CinematicHero';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' as const } }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const { openStepper } = useLeadStepper();
  return (
    <div className="bg-[#0d1117]">
      {/* ─── HERO: Cinematic scroll-scrubbed video ─── */}
      <CinematicHero />

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="py-6 border-y border-white/8" style={{ background: 'rgba(57,70,150,0.08)' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Google Reviews', value: '4.5★', sub: '91 reviews' },
              { label: "Angie's List", value: '4.9★', sub: '320 reviews' },
              { label: 'Houzz', value: '4.6★', sub: '23 reviews' },
              { label: 'Facebook', value: '4.8★', sub: '21 votes' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-0.5">
                <span className="text-xl font-black text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>{item.value}</span>
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider" style={{ fontFamily: 'Figtree, sans-serif' }}>{item.label}</span>
                <span className="text-xs text-white/30" style={{ fontFamily: 'Figtree, sans-serif' }}>{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section className="py-20 px-5 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-3" style={{ fontFamily: 'Figtree, sans-serif' }}>
            What We Do
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Complete Home Remodeling
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-white/50 max-w-xl mx-auto" style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem' }}>
            From kitchens to curb appeal — we handle every aspect of your home transformation under one roof.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((service, i) => (
            <motion.div key={service.id} variants={fadeUp} custom={i}>
              <Link href={service.slug}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer h-64"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {/* Background image */}
                  <img src={service.image} alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {/* Overlay */}
                  <div className="absolute inset-0 transition-all duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.95) 0%, rgba(13,17,23,0.5) 60%, rgba(13,17,23,0.1) 100%)' }} />
                  {/* Blue accent on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(57,70,150,0.3) 0%, transparent 60%)' }} />
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-3xl mb-2">{service.icon}</span>
                    <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: 'Figtree, sans-serif' }}>{service.title}</h3>
                    <p className="text-sm text-white/60 mb-3 line-clamp-2" style={{ fontFamily: 'Georgia, serif' }}>{service.tagline}</p>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-[#394696] uppercase tracking-wider group-hover:gap-3 transition-all duration-200"
                      style={{ fontFamily: 'Figtree, sans-serif' }}>
                      Learn More <ArrowRight size={13} />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-20 px-5 lg:px-8" style={{ background: 'rgba(57,70,150,0.06)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-3 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Why Sure-Fix
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black text-white mb-12 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Built on Trust. Delivered with Pride.
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Award size={28} />, title: '25+ Years Experience', desc: 'Henry founded Sure-Fix in 2008 after decades in construction. Every project carries that legacy.' },
                { icon: <Shield size={28} />, title: 'Licensed & Insured', desc: 'Fully licensed in PA & NJ. You\'re protected from day one through project completion.' },
                { icon: <CheckCircle size={28} />, title: 'Family-Run Business', desc: 'We treat your home like our own. Our family values drive every decision we make.' },
                { icon: <Clock size={28} />, title: 'On Time, On Budget', desc: 'Clear proposals, no hidden fees. We stick to the plan and keep you updated throughout.' },
              ].map((item, i) => (
                <motion.div key={item.title} variants={fadeUp} custom={i}
                  className="p-6 rounded-2xl border border-white/8 hover:border-[#394696]/40 transition-colors duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[#394696]"
                    style={{ background: 'rgba(57,70,150,0.15)' }}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-black text-white mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── REVIEWS STRIP ─── */}
      <section className="py-20 px-5 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} custom={0} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>What Clients Say</p>
              <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>Real Reviews. Real Results.</h2>
            </div>
            <Link href="/reviews">
              <motion.span whileHover={{ x: 4 }} className="flex items-center gap-2 text-sm font-bold text-[#394696] cursor-pointer" style={{ fontFamily: 'Figtree, sans-serif' }}>
                View All Reviews <ArrowRight size={15} />
              </motion.span>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.slice(0, 3).map((review, i) => (
              <motion.div key={review.name} variants={fadeUp} custom={i}
                className="p-6 rounded-2xl border border-white/8"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} size={13} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4" style={{ fontFamily: 'Georgia, serif' }}>"{review.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ background: '#394696', fontFamily: 'Figtree, sans-serif' }}>
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>{review.name}</p>
                    <p className="text-xs text-white/40" style={{ fontFamily: 'Figtree, sans-serif' }}>{review.source} Review</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── SHOWROOM BLURB ─── */}
      <section className="py-20 px-5 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/8">
            {/* Image side */}
            <div className="relative h-72 lg:h-auto min-h-[320px] overflow-hidden">
              <img
                src={SHOWROOM_HOME_IMAGE}
                alt="Sure-Fix in-house material showroom with countertop, flooring, and tile displays"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,17,23,0.2), rgba(13,17,23,0.6))' }} />
              <div className="absolute top-5 left-5">
                <span className="px-3 py-1.5 text-xs font-black tracking-wider text-white rounded-full uppercase" style={{ background: '#394696', fontFamily: 'Figtree, sans-serif' }}>In-House Showroom</span>
              </div>
            </div>
            {/* Content side */}
            <div className="p-10 lg:p-14 flex flex-col justify-center" style={{ background: 'rgba(57,70,150,0.08)' }}>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <p className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-3" style={{ fontFamily: 'Figtree, sans-serif' }}>The Sure-Fix Difference</p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>Your One-Stop Shop for Everything.</h2>
                <p className="text-white/60 leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  Most contractors send you to Home Depot or Lowe's to find your own materials. Not us. Sure-Fix has its own showroom stocked with countertops, flooring, tile, fixtures, siding, roofing, and more — all available to touch and compare in person. We supply every material your renovation needs, so your project stays on schedule and on budget.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Countertops', 'Flooring', 'Tile', 'Fixtures', 'Siding', 'Roofing', 'Windows'].map(item => (
                    <span key={item} className="flex items-center gap-1.5 text-sm text-white/60" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                      <CheckCircle size={13} className="text-[#394696]" /> {item}
                    </span>
                  ))}
                </div>
                <Link href="/showroom">
                  <motion.span whileHover={{ x: 6 }} className="inline-flex items-center gap-2 text-sm font-black text-white cursor-pointer uppercase tracking-wider" style={{ color: '#983631', fontFamily: 'Figtree, sans-serif' }}>
                    Explore Our Showroom <ArrowRight size={16} />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERIOR DESIGN BLURB ─── */}
      <section className="py-20 px-5 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/8">
            {/* Content side */}
            <div className="p-10 lg:p-14 flex flex-col justify-center order-2 lg:order-1" style={{ background: 'rgba(152,54,49,0.06)' }}>
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#983631', fontFamily: 'Figtree, sans-serif' }}>In-House Design Partner</p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>Professional Interior Design, Built In.</h2>
                <p className="text-white/60 leading-relaxed mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Sure-Fix is proud to partner with <strong className="text-white">Audra Frank</strong>, owner of Audra Frank Associates, as our in-house interior design professional. With a client list that includes Meryl Streep, Sting, Paul Simon, and Lorne Michaels, Audra brings world-class design expertise directly to your renovation.
                </p>
                <p className="text-white/50 leading-relaxed mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                  From space planning and material selection to colour palettes and custom furnishings — Audra's team handles every detail so your finished home is as beautiful as it is functional.
                </p>
                <Link href="/interior-design">
                  <motion.span whileHover={{ x: 6 }} className="inline-flex items-center gap-2 text-sm font-black cursor-pointer uppercase tracking-wider" style={{ color: '#983631', fontFamily: 'Figtree, sans-serif' }}>
                    Meet Audra & Explore Design Services <ArrowRight size={16} />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
            {/* Image side */}
            <div className="relative h-72 lg:h-auto min-h-[320px] overflow-hidden order-1 lg:order-2">
              <img
                src={SITE_IMAGES.galleryHero}
                alt="Interior Design by Audra Frank Associates"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, rgba(13,17,23,0.2), rgba(13,17,23,0.5))' }} />
              <div className="absolute top-5 right-5">
                <span className="px-3 py-1.5 text-xs font-black tracking-wider text-white rounded-full uppercase" style={{ background: '#983631', fontFamily: 'Figtree, sans-serif' }}>Audra Frank Associates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 px-5 lg:px-8 relative overflow-hidden" style={{ background: '#394696' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #983631 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} custom={0}
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: 'Figtree, sans-serif' }}>
              Ready to Start Your Project?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1}
              className="text-white/75 text-lg mb-8 max-w-xl mx-auto"
              style={{ fontFamily: 'Georgia, serif' }}>
              Get a free, no-obligation estimate from Lehigh Valley's most trusted remodeling team. We'll visit your home and create a plan around your vision and budget.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4">
              <motion.button
                  type="button"
                  onClick={() => openStepper()}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider"
                  style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', border: 'none' }}
                >
                  Get Free Estimate <ArrowRight size={16} />
                </motion.button>
              <a href={BUSINESS.phoneHref}>
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider border-2 border-white/30"
                  style={{ fontFamily: 'Figtree, sans-serif', background: 'rgba(255,255,255,0.1)' }}
                >
                  <Phone size={15} /> Call {BUSINESS.phone}
                </motion.span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
