/*
 * HERO SECTION — Sure-Fix Remodeling
 * Design: Full-screen VIDEO background, dark overlay, split layout
 * Left: Figtree 900 staggered headline + CTAs | Right: Mascot float + speech bubble
 * Animations: Framer Motion stagger + blur entrance, CSS float loop
 * UI/UX Pro Max: Video-First Hero, 65% dark overlay, brand accent CTA
 */
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Star, Shield, Award } from 'lucide-react';

const MASCOT_URL = '/manus-storage/sticker_v5_final_7556bcfe.webp';
const VIDEO_URL = '/manus-storage/surefix-hero-kitchen2_004a6484.mp4';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.55 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 48, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.85, ease: 'easeOut' as const },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0d1117]">
      {/* ── Video Background ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1200 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(13,17,23,0.88) 0%, rgba(13,17,23,0.72) 45%, rgba(57,70,150,0.22) 100%)'
        }} />
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)'
        }} />
      </div>

      {/* ── Top accent line ── */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-10"
        style={{ background: 'linear-gradient(90deg, #394696 0%, #983631 50%, #394696 100%)' }} />

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10 items-center min-h-[82vh]">

          {/* Left: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Location badge */}
            <motion.div variants={slideRight} className="mb-7">
              <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/6 backdrop-blur-sm"
                style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#983631] animate-pulse flex-shrink-0" />
                Easton, PA · Lehigh Valley
              </span>
            </motion.div>

            {/* Headline — word by word stagger */}
            <div className="mb-7">
              <motion.div variants={fadeUp}>
                <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-black leading-[0.88] tracking-tight text-white"
                  style={{ fontFamily: 'Figtree, sans-serif' }}>
                  YOUR HOME,
                </h1>
              </motion.div>
              <motion.div variants={fadeUp}>
                <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-black leading-[0.88] tracking-tight"
                  style={{ fontFamily: 'Figtree, sans-serif', color: '#e9eae5' }}>
                  <span style={{ color: '#394696' }}>TRANS</span>FORMED.
                </h1>
              </motion.div>
            </div>

            {/* Subheadline */}
            <motion.p variants={fadeUp}
              className="text-lg text-white/65 max-w-[480px] mb-8 leading-relaxed"
              style={{ fontFamily: 'Georgia, serif' }}>
              Premium kitchen, bathroom, basement, and exterior renovations.
              Craftsmanship you can trust — results that last a lifetime.
            </motion.p>

            {/* Trust signals */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-9">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-[#983631] text-[#983631]" />
                ))}
                <span className="text-white/55 text-xs ml-1" style={{ fontFamily: 'Figtree, sans-serif' }}>5.0</span>
              </div>
              <span className="text-white/25">|</span>
              <span className="text-white/55 text-sm flex items-center gap-1.5" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                <Shield size={13} className="text-[#394696]" /> Licensed & Insured
              </span>
              <span className="text-white/25">|</span>
              <span className="text-white/55 text-sm flex items-center gap-1.5" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                <Award size={13} className="text-[#394696]" /> 15+ Years
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#contact')}
                className="btn-red flex items-center gap-2.5 text-sm"
              >
                Get Free Estimate <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#gallery')}
                className="btn-secondary text-sm"
              >
                View Our Work
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {[
                { value: '500+', label: 'Projects Done' },
                { value: '15+', label: 'Years Experience' },
                { value: '100%', label: 'Licensed & Insured' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-white mb-0.5"
                    style={{ fontFamily: 'Figtree, sans-serif' }}>{stat.value}</div>
                  <div className="text-xs text-white/45 uppercase tracking-wide"
                    style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Mascot */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.85, duration: 1, ease: 'easeOut' as const }}
            className="hidden lg:flex justify-center items-end relative pb-4"
          >
            {/* Radial glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-64 rounded-full opacity-25 blur-3xl"
              style={{ background: 'radial-gradient(circle, #394696 0%, transparent 70%)' }} />

            {/* Speech bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.65, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.55, ease: 'backOut' as const }}
              className="absolute top-6 right-2 bg-white rounded-2xl rounded-br-sm px-4 py-3 shadow-2xl max-w-[185px] z-20"
            >
              <p className="text-[#0d1117] text-sm font-bold leading-snug"
                style={{ fontFamily: 'Figtree, sans-serif' }}>
                "Ready to transform your home?"
              </p>
              <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white rotate-45" />
            </motion.div>

            {/* Mascot */}
            <img
              src={MASCOT_URL}
              alt="Sure-Fix Remodeling mascot"
              className="mascot-float relative z-10 w-72 xl:w-[340px] object-contain drop-shadow-2xl select-none"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('#services')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/35 hover:text-white/65 transition-colors"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
