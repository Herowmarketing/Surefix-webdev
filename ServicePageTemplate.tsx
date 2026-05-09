/*
 * SERVICE PAGE TEMPLATE — Sure-Fix Remodeling
 * Reusable template for all service pages
 * Sections: Hero → Features → Process → Gallery → CTA
 */
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { useLeadStepper } from '@/contexts/LeadStepperContext';

interface ServicePageProps {
  title: string;
  tagline: string;
  description: string;
  icon: string;
  heroImage: string;
  features: string[];
  galleryImages: string[];
  subServices?: { name: string; desc: string }[];
  accentColor?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ServicePageTemplate({
  title, tagline, description, icon, heroImage, features, galleryImages, subServices, accentColor = '#394696'
}: ServicePageProps) {
  const { openStepper } = useLeadStepper();
  return (
    <div className="bg-[#0d1117] min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden">
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.97) 0%, rgba(13,17,23,0.6) 50%, rgba(13,17,23,0.2) 100%)' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-8 pb-16 pt-32">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
              <Link href="/services">
                <span className="text-xs font-bold text-white/40 hover:text-white/70 transition-colors cursor-pointer uppercase tracking-widest" style={{ fontFamily: 'Figtree, sans-serif' }}>
                  Services
                </span>
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-xs font-bold text-[#394696] uppercase tracking-widest" style={{ fontFamily: 'Figtree, sans-serif' }}>{title}</span>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="flex items-center gap-4 mb-3">
              <span className="text-5xl">{icon}</span>
              <h1 className="text-4xl md:text-6xl font-black text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>{title}</h1>
            </motion.div>
            <motion.p variants={fadeUp} custom={2} className="text-xl text-white/60 max-w-2xl" style={{ fontFamily: 'Georgia, serif' }}>{tagline}</motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── DESCRIPTION + FEATURES ─── */}
      <section className="py-20 px-5 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Description */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest mb-4" style={{ fontFamily: 'Figtree, sans-serif', color: accentColor }}>
              About This Service
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="text-white/70 text-lg leading-relaxed mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              {description}
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row gap-3">
              <motion.button
                  type="button"
                  onClick={() => openStepper()}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider"
                  style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', border: 'none' }}
                >
                  Get Free Estimate <ArrowRight size={15} />
                </motion.button>
              <a href={BUSINESS.phoneHref}>
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-black text-white cursor-pointer border border-white/15"
                  style={{ fontFamily: 'Figtree, sans-serif', background: 'rgba(255,255,255,0.04)' }}
                >
                  <Phone size={14} /> {BUSINESS.phone}
                </motion.span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Features */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest mb-6 text-white/40" style={{ fontFamily: 'Figtree, sans-serif' }}>
              What's Included
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <motion.div key={feature} variants={fadeUp} custom={i}
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/8"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <CheckCircle size={16} style={{ color: accentColor, flexShrink: 0 }} />
                  <span className="text-sm font-bold text-white/80" style={{ fontFamily: 'Figtree, sans-serif' }}>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SUB-SERVICES (optional) ─── */}
      {subServices && subServices.length > 0 && (
        <section className="py-16 px-5 lg:px-8 border-t border-white/5" style={{ background: 'rgba(57,70,150,0.05)' }}>
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} custom={0} className="text-3xl font-black text-white mb-10 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
                Everything We Offer
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {subServices.map((sub, i) => (
                  <motion.div key={sub.name} variants={fadeUp} custom={i}
                    className="p-6 rounded-2xl border border-white/8 hover:border-[#394696]/40 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <h3 className="text-lg font-black text-white mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>{sub.name}</h3>
                    <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{sub.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── GALLERY ─── */}
      {galleryImages.length > 0 && (
        <section className="py-16 px-5 lg:px-8 max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl font-black text-white mb-8 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Our Work
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {galleryImages.map((img, i) => (
                <motion.div key={i} variants={fadeUp} custom={i}
                  whileHover={{ scale: 1.02 }}
                  className="aspect-video rounded-xl overflow-hidden">
                  <img src={img} alt={`${title} project ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── CTA BANNER ─── */}
      <section className="py-16 px-5 lg:px-8" style={{ background: accentColor }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Ready to Get Started?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/75 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              Schedule a free in-home consultation and let's bring your vision to life.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4">
              <motion.button
                  type="button"
                  onClick={() => openStepper()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider"
                  style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', border: 'none' }}
                >
                  Get Free Estimate <ArrowRight size={15} />
                </motion.button>
              <a href={BUSINESS.phoneHref}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-black text-white cursor-pointer border-2 border-white/30"
                  style={{ fontFamily: 'Figtree, sans-serif', background: 'rgba(255,255,255,0.1)' }}
                >
                  <Phone size={14} /> {BUSINESS.phone}
                </motion.span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
