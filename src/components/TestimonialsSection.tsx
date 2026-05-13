/*
 * TESTIMONIALS SECTION — Sure-Fix Remodeling
 * Design: Dark navy bg, glassmorphism card carousel, star ratings
 * UI/UX Pro Max: Slide transition with AnimatePresence, dot navigation
 */
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Jennifer M.',
    location: 'Easton, PA',
    project: 'Full Kitchen Remodel',
    rating: 5,
    text: 'Sure-Fix completely transformed our outdated kitchen into a showroom-worthy space. The team was professional, clean, and finished 3 days ahead of schedule. We get compliments from every guest. Worth every penny.',
    initials: 'JM',
    color: '#394696',
  },
  {
    name: 'Robert & Lisa T.',
    location: 'Bethlehem, PA',
    project: 'Master Bathroom Renovation',
    rating: 5,
    text: 'We\'ve used other contractors before and the difference is night and day. Sure-Fix communicated every step, handled all the permits, and the tile work is absolutely flawless. Our bathroom feels like a five-star hotel.',
    initials: 'RT',
    color: '#983631',
  },
  {
    name: 'David K.',
    location: 'Phillipsburg, NJ',
    project: 'Basement Finishing',
    rating: 5,
    text: 'Turned our unfinished basement into a full entertainment room with a bar. The project came in on budget and the craftsmanship is outstanding. My family spends more time down there than anywhere else in the house.',
    initials: 'DK',
    color: '#394696',
  },
  {
    name: 'Sarah & Tom W.',
    location: 'Allentown, PA',
    project: 'Exterior & Siding',
    rating: 5,
    text: 'Our home looks brand new. The crew was respectful of our property, cleaned up every day, and the new siding and windows have already reduced our energy bills. Highly recommend to anyone in the Lehigh Valley.',
    initials: 'SW',
    color: '#983631',
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-[#0d1117] relative overflow-hidden" ref={ref}>
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#394696]/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="section-label justify-center mb-4 block">Client Stories</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'Figtree, sans-serif', lineHeight: 1.05 }}>
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-[#983631] text-[#983631]" />
            ))}
          </div>
          <p className="text-white/40 text-sm" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
            4.9 out of 5 — based on 120+ Google reviews
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-2xl p-8 lg:p-10"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <Quote size={36} style={{ color: `${testimonials[current].color}50` }} className="mb-6" />
              <p className="text-white/75 text-lg lg:text-xl leading-relaxed mb-8 italic"
                style={{ fontFamily: 'Georgia, serif' }}>
                "{testimonials[current].text}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: testimonials[current].color }}>
                    <span className="text-white font-black text-sm"
                      style={{ fontFamily: 'Figtree, sans-serif' }}>{testimonials[current].initials}</span>
                  </div>
                  <div>
                    <p className="text-white font-black" style={{ fontFamily: 'Figtree, sans-serif' }}>
                      {testimonials[current].name}
                    </p>
                    <p className="text-white/40 text-sm" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 500 }}>
                      {testimonials[current].location} · {testimonials[current].project}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-[#983631] text-[#983631]" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={() => go(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-[#983631]' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <motion.button
              onClick={() => go(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
