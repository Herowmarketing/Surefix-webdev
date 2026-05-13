/*
 * REVIEWS PAGE — Sure-Fix Remodeling
 * All reviews from Google, Angie's List, Houzz, Facebook
 */
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { REVIEWS } from '@/lib/constants';
import { useLeadStepper } from '@/contexts/LeadStepperContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: 'easeOut' as const } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const ALL_REVIEWS = [
  ...REVIEWS,
  {
    name: 'Stephanie K.',
    rating: 5,
    text: 'Sure Fix Remodeling did an incredible job on my landscape design! Henry was not only professional but also one of the nicest and friendliest people I\'ve ever worked with. Highly recommend!',
    source: 'Google',
  },
  {
    name: 'Mike T.',
    rating: 5,
    text: 'Henry and his team were excellent to work with from day one. I had a complicated renovation of my kitchen that I needed to have done. My cathedral ceiling needed special attention and they handled it perfectly.',
    source: 'Google',
  },
  {
    name: 'Marilyn D.',
    rating: 5,
    text: 'Sure-fix recently remodeled our kitchen. This was our first time hiring a company to remodel our kitchen. So, my husband and I were hesitant about taking on this project. But Sure-Fix made it seamless. They were professional, on time, and the quality was outstanding.',
    source: 'Google',
  },
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'We hired Sure-Fix to remodel our master bathroom and we couldn\'t be happier. The tile work is immaculate, the new vanity is gorgeous, and the whole project was done in under two weeks. Tony kept us informed every single day.',
    source: "Angie's List",
  },
  {
    name: 'Robert H.',
    rating: 5,
    text: 'Henry and his team transformed our unfinished basement into a beautiful living space. The attention to detail was incredible — from the recessed lighting to the custom bar area. We use it every day.',
    source: "Angie's List",
  },
  {
    name: 'Jennifer P.',
    rating: 5,
    text: 'We had our entire first floor remodeled — kitchen, dining room, and living room opened up. The team was respectful, clean, and incredibly skilled. The result looks like something out of a magazine.',
    source: 'Houzz',
  },
  {
    name: 'David L.',
    rating: 5,
    text: 'Excellent work on our deck and patio project. The craftsmanship is top-notch and the team was a pleasure to work with. They finished ahead of schedule and under budget. Will definitely hire again.',
    source: 'Facebook',
  },
  {
    name: 'Lisa R.',
    rating: 5,
    text: 'Chris in the showroom made the whole selection process so easy. He helped us pick the perfect tile, countertops, and fixtures for our bathroom renovation. The final result is absolutely stunning.',
    source: 'Google',
  },
  {
    name: 'Tom B.',
    rating: 4,
    text: 'Very professional company. They replaced our roof and installed new siding. The work quality is excellent and they cleaned up completely every day. Minor scheduling hiccup but they communicated well throughout.',
    source: 'Houzz',
  },
];

const PLATFORM_STATS = [
  { platform: "Angie's List", rating: 4.9, count: 320, color: '#E8A000' },
  { platform: 'Google', rating: 4.5, count: 91, color: '#4285F4' },
  { platform: 'Houzz', rating: 4.6, count: 23, color: '#7DB928' },
  { platform: 'Facebook', rating: 4.8, count: 21, color: '#1877F2' },
];

export default function Reviews() {
  const { openStepper } = useLeadStepper();
  return (
    <div className="bg-[#0d1117] min-h-screen">
      {/* Hero */}
      <section className="pt-36 pb-16 px-5 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
            What Our Clients Say
          </motion.p>
          <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Real Reviews.<br />Real Results.
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="text-white/60 text-xl max-w-2xl" style={{ fontFamily: 'Georgia, serif' }}>
            Hundreds of homeowners across Lehigh Valley trust Sure-Fix Remodeling. Here's what they have to say.
          </motion.p>
        </motion.div>
      </section>

      {/* Platform stats */}
      <section className="pb-16 px-5 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {PLATFORM_STATS.map((p, i) => (
            <motion.div key={p.platform} variants={fadeUp} custom={i}
              className="p-6 rounded-2xl border border-white/8 text-center"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="text-4xl font-black text-white mb-1" style={{ fontFamily: 'Figtree, sans-serif' }}>{p.rating}★</div>
              <div className="text-sm font-bold text-white/70 mb-1" style={{ fontFamily: 'Figtree, sans-serif' }}>{p.platform}</div>
              <div className="text-xs text-white/30" style={{ fontFamily: 'Figtree, sans-serif' }}>{p.count} reviews</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Reviews grid */}
      <section className="pb-20 px-5 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {ALL_REVIEWS.map((review, i) => (
            <motion.div key={`${review.name}-${i}`} variants={fadeUp} custom={i}
              className="p-6 rounded-2xl border border-white/8 hover:border-[#394696]/30 transition-colors"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, j) => <Star key={j} size={13} className="fill-yellow-400 text-yellow-400" />)}
                {review.rating < 5 && [...Array(5 - review.rating)].map((_, j) => <Star key={j} size={13} className="text-white/20" />)}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Georgia, serif' }}>"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ background: '#394696', fontFamily: 'Figtree, sans-serif' }}>
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>{review.name}</p>
                    <p className="text-xs text-white/40" style={{ fontFamily: 'Figtree, sans-serif' }}>{review.source}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 lg:px-8" style={{ background: '#394696' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Ready to Be Our Next Success Story?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/75 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              Join hundreds of satisfied homeowners across Lehigh Valley. Get your free estimate today.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
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
