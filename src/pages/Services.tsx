/*
 * SERVICES OVERVIEW PAGE — Sure-Fix Remodeling
 */
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Phone } from 'lucide-react';
import { SERVICES, BUSINESS } from '@/lib/constants';
import { useLeadStepper } from '@/contexts/LeadStepperContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function Services() {
  const { openStepper } = useLeadStepper();
  return (
    <div className="bg-[#0d1117] min-h-screen">
      {/* Hero */}
      <section className="pt-36 pb-16 px-5 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
            What We Do
          </motion.p>
          <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Our Services
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="text-white/60 text-xl max-w-2xl" style={{ fontFamily: 'Georgia, serif' }}>
            From kitchens to curb appeal — Sure-Fix Remodeling handles every aspect of your home transformation under one roof, with 25+ years of craftsmanship behind every project.
          </motion.p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 px-5 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => (
            <motion.div key={service.id} variants={fadeUp} custom={i}>
              <Link href={service.slug}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer border border-white/8 hover:border-[#394696]/40 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  {/* Image */}
                  <div className="h-52 overflow-hidden">
                    <img src={service.image} alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  {/* Overlay gradient */}
                  <div className="absolute top-0 left-0 right-0 h-52"
                    style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.8) 0%, transparent 60%)' }} />
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{service.icon}</span>
                      <h2 className="text-xl font-black text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>{service.title}</h2>
                    </div>
                    <p className="text-sm text-white/55 mb-4 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{service.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-xs px-2.5 py-1 rounded-full text-white/60 border border-white/10" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                          {f}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="text-xs px-2.5 py-1 rounded-full text-[#394696] border border-[#394696]/30" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                          +{service.features.length - 3} more
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-2 text-sm font-bold text-[#394696] group-hover:gap-3 transition-all duration-200" style={{ fontFamily: 'Figtree, sans-serif' }}>
                      Learn More <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 lg:px-8" style={{ background: '#394696' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Not Sure Where to Start?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/75 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              Call us or request a free estimate — we'll visit your home, assess your needs, and recommend the best path forward.
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
                <motion.span whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-black text-white cursor-pointer border-2 border-white/30"
                  style={{ fontFamily: 'Figtree, sans-serif', background: 'rgba(255,255,255,0.1)' }}>
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
