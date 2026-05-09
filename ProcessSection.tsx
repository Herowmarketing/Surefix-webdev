/*
 * PROCESS SECTION — Sure-Fix Remodeling
 * Design: Dark bg, numbered vertical timeline on mobile / horizontal on desktop
 * UI/UX Pro Max: Animated progress line, staggered step entrance, icon glow on hover
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Ruler, FileCheck, Hammer, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Free Consultation',
    description: 'We visit your home, listen to your vision, take measurements, and discuss your budget — no pressure, no obligation.',
    color: '#394696',
  },
  {
    number: '02',
    icon: Ruler,
    title: 'Design & Planning',
    description: 'Detailed plans, material selections, and a transparent itemized quote within 5 business days.',
    color: '#983631',
  },
  {
    number: '03',
    icon: FileCheck,
    title: 'Permits & Prep',
    description: 'We handle all permits and inspections. You don\'t lift a finger — we manage the paperwork.',
    color: '#394696',
  },
  {
    number: '04',
    icon: Hammer,
    title: 'Expert Build',
    description: 'Our skilled craftsmen execute the work on schedule, keeping your home clean with daily updates.',
    color: '#983631',
  },
  {
    number: '05',
    icon: CheckCircle,
    title: 'Final Walkthrough',
    description: 'A detailed walkthrough together. You don\'t sign off until every detail meets your expectations.',
    color: '#394696',
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" className="py-24 bg-[#0d1117] relative overflow-hidden" ref={ref}>
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#394696]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="section-label justify-center mb-4 block">How It Works</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5"
            style={{ fontFamily: 'Figtree, sans-serif', lineHeight: 1.05 }}>
            Our Proven Process
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: 'Georgia, serif' }}>
            No surprises. No delays. Just a clear, professional process from the first call to the final nail.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <motion.div
            className="hidden lg:block absolute top-[3.5rem] left-[10%] right-[10%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #394696 20%, #983631 50%, #394696 80%, transparent)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 44 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.13, duration: 0.7, ease: 'easeOut' }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Icon circle */}
                <div className="relative mb-6 z-10">
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: step.color }}
                    whileHover={{ boxShadow: `0 0 28px ${step.color}80` }}
                  >
                    <step.icon size={22} className="text-white" />
                  </motion.div>
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0d1117] border border-white/15 flex items-center justify-center">
                    <span className="text-white text-[9px] font-black" style={{ fontFamily: 'Figtree, sans-serif' }}>{step.number}</span>
                  </div>
                </div>

                <h3 className="text-base font-black text-white mb-2"
                  style={{ fontFamily: 'Figtree, sans-serif' }}>{step.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed"
                  style={{ fontFamily: 'Georgia, serif' }}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.5, ease: 'easeOut' }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-5 rounded-2xl px-8 py-6"
            style={{ background: 'rgba(57,70,150,0.12)', border: '1px solid rgba(57,70,150,0.25)' }}>
            <div className="text-left">
              <p className="text-white font-black text-lg" style={{ fontFamily: 'Figtree, sans-serif' }}>
                Ready to start your project?
              </p>
              <p className="text-white/45 text-sm mt-0.5" style={{ fontFamily: 'Georgia, serif' }}>
                Book your free consultation — we'll come to you.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary flex-shrink-0 flex items-center gap-2"
            >
              Book Consultation <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
