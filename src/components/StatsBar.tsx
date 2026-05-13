/*
 * STATS BAR — Sure-Fix Remodeling
 * Design: Dark navy band with animated counters, icon badges, brand blue/red accents
 * UI/UX Pro Max: Number reveal animation on scroll entry
 */
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Home, Star, Clock, Award } from 'lucide-react';

const stats = [
  { icon: Home, value: 500, suffix: '+', label: 'Projects Completed', color: '#394696' },
  { icon: Star, value: 5, suffix: '.0', label: 'Average Rating', color: '#983631' },
  { icon: Clock, value: 15, suffix: '+', label: 'Years in Business', color: '#394696' },
  { icon: Award, value: 100, suffix: '%', label: 'Licensed & Insured', color: '#983631' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-[#111827] border-y border-white/8 py-12">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${stat.color}20`, border: `1px solid ${stat.color}40` }}>
                <stat.icon size={22} style={{ color: stat.color }} />
              </div>
              <div className="text-4xl font-black text-white"
                style={{ fontFamily: 'Figtree, sans-serif' }}>
                {inView && <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-xs text-white/50 uppercase tracking-widest"
                style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
