/*
 * ABOUT PAGE — Sure-Fix Remodeling
 * Henry's story, team, values, and mascot
 */
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Award, Shield, CheckCircle, Heart } from 'lucide-react';
import { BUSINESS, TEAM, MASCOT_URL } from '@/lib/constants';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { useSeo, breadcrumbList, ORGANIZATION_ID, SITE_URL } from '@/lib/seo';
import { PAGE_SEO } from '@/lib/seo-config';
import PhoneLink from '@/components/PhoneLink';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function About() {
  const { openStepper } = useLeadStepper();
  useSeo({
    ...PAGE_SEO.about,
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        mainEntity: { '@id': ORGANIZATION_ID },
        url: `${SITE_URL}/about`,
      },
      ...TEAM.map((t) => ({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: t.name,
        jobTitle: t.role,
        worksFor: { '@id': ORGANIZATION_ID },
        description: t.bio,
        image: t.image,
      })),
    ],
  });
  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="pt-36 pb-20 px-5 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Our Story
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Built on Family.<br />Built for the Forever Home.
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-slate-600 text-lg leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Sure-Fix owner Henry Rouhana has a passion for construction that began when he was a young man working alongside his father in Lebanon. He took that passion to college, where he received his degree in Architecture.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-slate-600 text-lg leading-relaxed mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              After graduation, he moved to Lehigh Valley, became an American citizen, and started working in construction. In 2008, Henry began Sure-Fix Remodeling as a family-run business to ensure that the values he learned working alongside his father continued with his family.
            </motion.p>
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                <Award size={16} className="text-[#394696]" /> Founded 2008
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                <Shield size={16} className="text-[#394696]" /> Licensed & Insured
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
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
      <section className="py-12 border-y border-slate-200" style={{ background: 'rgba(57,70,150,0.05)' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '25+', label: 'Years Experience' },
              { value: '1,000+', label: 'Projects Completed' },
              { value: '4.9★', label: "Angie's List Rating" },
              { value: '100%', label: 'Licensed & Insured' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-black text-slate-900 mb-1" style={{ fontFamily: 'Figtree, sans-serif' }}>{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500" style={{ fontFamily: 'Figtree, sans-serif' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUSTED PROFESSIONAL POSITIONING ─── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 55% 65% at 90% 0%, rgba(57,70,150,0.16) 0%, transparent 60%), radial-gradient(ellipse 55% 60% at 0% 100%, rgba(152,54,49,0.1) 0%, transparent 65%)',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center lg:px-8 lg:py-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#394696]"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            The Trusted Professional sweet spot
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mx-auto max-w-3xl text-slate-900"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 4.6vw, 3.2rem)',
              letterSpacing: '-0.022em',
              lineHeight: 1.05,
            }}
          >
            High-end firm <span className="italic">reliability.</span> Family-run <span className="italic">accountability.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Sure-Fix delivers the reliability, quality, and service of a high-end firm without the inflated overhead — while far outperforming small general contractors in communication and accountability. It’s why our clients come back, and why they refer the people they love.
          </motion.p>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-20 px-5 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-3 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
            What We Stand For
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-black text-slate-900 mb-12 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
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
                className="p-6 rounded-2xl border border-slate-200 hover:border-[#394696]/40 transition-colors"
                style={{ background: '#f8fafc' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-[#394696]"
                  style={{ background: 'rgba(57,70,150,0.15)' }}>
                  {val.icon}
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>{val.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-20 px-5 lg:px-8 border-t border-slate-200" style={{ background: 'rgba(57,70,150,0.05)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-3 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
              The People Behind the Work
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-black text-slate-900 mb-12 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Meet Our Team
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member, i) => (
                <motion.div key={member.name} variants={fadeUp} custom={i}
                  className="rounded-2xl overflow-hidden border border-slate-200"
                  style={{ background: '#f8fafc' }}>
                  <div className="h-48 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-slate-900 mb-0.5" style={{ fontFamily: 'Figtree, sans-serif' }}>{member.name}</h3>
                    <p className="text-xs font-bold text-[#394696] uppercase tracking-wider mb-3" style={{ fontFamily: 'Figtree, sans-serif' }}>{member.role}</p>
                    <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{member.bio}</p>
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
            <motion.p variants={fadeUp} custom={1} className="text-white/85 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              Contact us today at{' '}
              <PhoneLink className="font-bold text-white underline underline-offset-2 hover:text-white/80">
                {BUSINESS.phone}
              </PhoneLink>{' '}
              to request a free consultation for your next project.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4">
              <motion.button
                type="button"
                onClick={() => openStepper()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-black text-slate-900 cursor-pointer uppercase tracking-wider"
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
