/*
 * ABOUT PAGE — Sure-Fix Remodeling
 * Henry's story, team, values, and mascot
 */
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Award, Shield, CheckCircle, Heart } from 'lucide-react';
import { BUSINESS, TEAM, MASCOT_URL } from '@/lib/constants';
import { useLeadStepper } from '@/contexts/LeadStepperContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function About() {
  const { openStepper } = useLeadStepper();
  return (
    <div className="bg-[#0d1117] min-h-screen">
      {/* ─── HERO ─── */}
      <section className="pt-36 pb-20 px-5 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Our Story
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Built on Family.<br />Built to Last.
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/65 text-lg leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Sure-Fix owner Henry Rouhana has a passion for construction that began when he was a young man working alongside his father in Lebanon. He took that passion to college, where he received his degree in Architecture.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-white/65 text-lg leading-relaxed mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              After graduation, he moved to Lehigh Valley, became an American citizen, and started working in construction. In 2008, Henry began Sure-Fix Remodeling as a family-run business to ensure that the values he learned working alongside his father continued with his family.
            </motion.p>
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-white/60" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                <Award size={16} className="text-[#394696]" /> Founded 2008
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                <Shield size={16} className="text-[#394696]" /> Licensed & Insured
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                <Heart size={16} className="text-[#983631]" /> Family-Run
              </div>
            </motion.div>
          </motion.div>

          {/* Mascot */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' as const }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20" style={{ background: '#394696' }} />
              <img src={MASCOT_URL} alt="Sure-Fix Mascot" className="relative w-72 lg:w-96 h-auto drop-shadow-2xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-12 border-y border-white/5" style={{ background: 'rgba(57,70,150,0.07)' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '25+', label: 'Years Experience' },
              { value: '500+', label: 'Projects Completed' },
              { value: '4.9★', label: "Angie's List Rating" },
              { value: '100%', label: 'Licensed & Insured' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-black text-white mb-1" style={{ fontFamily: 'Figtree, sans-serif' }}>{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-white/40" style={{ fontFamily: 'Figtree, sans-serif' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-20 px-5 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-3 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
            What We Stand For
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-black text-white mb-12 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <CheckCircle size={24} />, title: 'Quality Craftsmanship', desc: 'We use premium materials and proven techniques. Every detail matters — from the first nail to the final coat.' },
              { icon: <Shield size={24} />, title: 'Integrity & Transparency', desc: 'Clear proposals, honest timelines, and no hidden fees. You always know exactly what you\'re getting.' },
              { icon: <Heart size={24} />, title: 'Family Values', desc: 'We treat every home as if it were our own — with the care, respect, and attention it deserves.' },
              { icon: <Award size={24} />, title: 'Customer Satisfaction', desc: 'We don\'t consider a job done until you\'re completely satisfied. Your approval is our finish line.' },
            ].map((val, i) => (
              <motion.div key={val.title} variants={fadeUp} custom={i}
                className="p-6 rounded-2xl border border-white/8 hover:border-[#394696]/40 transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-[#394696]"
                  style={{ background: 'rgba(57,70,150,0.15)' }}>
                  {val.icon}
                </div>
                <h3 className="text-base font-black text-white mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>{val.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-20 px-5 lg:px-8 border-t border-white/5" style={{ background: 'rgba(57,70,150,0.05)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-3 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
              The People Behind the Work
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-black text-white mb-12 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Meet Our Team
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member, i) => (
                <motion.div key={member.name} variants={fadeUp} custom={i}
                  className="rounded-2xl overflow-hidden border border-white/8"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="h-48 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-white mb-0.5" style={{ fontFamily: 'Figtree, sans-serif' }}>{member.name}</h3>
                    <p className="text-xs font-bold text-[#394696] uppercase tracking-wider mb-3" style={{ fontFamily: 'Figtree, sans-serif' }}>{member.role}</p>
                    <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 px-5 lg:px-8" style={{ background: '#394696' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Ready to Work with Us?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/75 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              Contact us today at {BUSINESS.phone} to request a free consultation for your next project.
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
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
