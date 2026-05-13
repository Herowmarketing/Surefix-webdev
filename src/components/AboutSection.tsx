/*
 * ABOUT SECTION — Sure-Fix Remodeling
 * Design: Split layout — left text + checklist, right mascot + floating trust cards
 * Dark navy bg with decorative rings and glow
 * UI/UX Pro Max: Staggered checklist reveal, floating card entrance
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, MapPin } from 'lucide-react';

const MASCOT = '/manus-storage/sticker_v5_final_7f0c0762.webp';

const highlights = [
  'Licensed & fully insured in PA, NJ & NY',
  'Family-owned and operated since 2010',
  'Every project managed by a senior craftsman',
  'We never use subcontractors for core work',
  'Transparent pricing — no hidden fees',
  'Lifetime workmanship warranty on all projects',
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="bg-[#111827] py-24 relative overflow-hidden" ref={ref}>
      {/* Decorative rings */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#394696]/15 pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#394696]/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="section-label mb-4 block">Our Story</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6"
              style={{ fontFamily: 'Figtree, sans-serif', lineHeight: 1.05 }}>
              Built on Trust,<br />
              <span style={{ color: '#394696' }}>Delivered with Pride</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-5"
              style={{ fontFamily: 'Georgia, serif' }}>
              Sure-Fix Remodeling was founded in Easton, PA with a simple mission: deliver the quality of a high-end contractor at a price that respects your budget. Over 15 years and 500+ projects later, that mission hasn't changed.
            </p>
            <p className="text-white/55 text-lg leading-relaxed mb-8"
              style={{ fontFamily: 'Georgia, serif' }}>
              We serve homeowners across the Greater Lehigh Valley, Western New Jersey, and beyond. Every project gets the same level of attention and craftsmanship.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2 size={16} className="text-[#983631] mt-0.5 flex-shrink-0" />
                  <span className="text-white/65 text-sm" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 500 }}>{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Service area */}
            <div className="flex items-start gap-2 text-white/40 text-sm">
              <MapPin size={15} className="text-[#983631] mt-0.5 flex-shrink-0" />
              <span style={{ fontFamily: 'Figtree, sans-serif' }}>Serving Easton, Bethlehem, Allentown, Phillipsburg, Hackettstown & surrounding areas</span>
            </div>
          </motion.div>

          {/* Right: Mascot + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative flex justify-center items-center min-h-[420px]"
          >
            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-64 rounded-full blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle, #394696 0%, transparent 70%)' }} />

            {/* Mascot */}
            <div className="mascot-float relative z-10">
              <img
                src={MASCOT}
                alt="Sure-Fix Remodeling owner"
                className="w-64 xl:w-72 object-contain drop-shadow-2xl select-none"
                draggable={false}
              />
            </div>

            {/* Floating card: BBB */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.88 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.65, duration: 0.5, ease: 'backOut' }}
              className="absolute bottom-6 -left-2 bg-white rounded-2xl p-4 shadow-2xl"
            >
              <div className="text-3xl font-black text-[#394696] leading-none mb-1"
                style={{ fontFamily: 'Figtree, sans-serif' }}>A+</div>
              <div className="text-xs font-bold text-[#0d1117] uppercase tracking-wide"
                style={{ fontFamily: 'Figtree, sans-serif' }}>BBB Rating</div>
              <div className="text-xs text-[#6b7280] mt-0.5"
                style={{ fontFamily: 'Georgia, serif' }}>Accredited Business</div>
            </motion.div>

            {/* Floating card: Reviews */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.88 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.85, duration: 0.5, ease: 'backOut' }}
              className="absolute top-6 -right-2 bg-[#983631] rounded-2xl p-4 shadow-2xl"
            >
              <div className="text-xl font-black text-white leading-none mb-1"
                style={{ fontFamily: 'Figtree, sans-serif' }}>★★★★★</div>
              <div className="text-xs font-bold text-white/85 uppercase tracking-wide"
                style={{ fontFamily: 'Figtree, sans-serif' }}>Google Reviews</div>
              <div className="text-xs text-white/60 mt-0.5"
                style={{ fontFamily: 'Georgia, serif' }}>4.9 / 5 — 120+ reviews</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
