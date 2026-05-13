/*
 * GALLERY SECTION — Sure-Fix Remodeling
 * Design: Dark bg, filterable masonry grid, hover zoom + overlay reveal
 * UI/UX Pro Max: AnimatePresence layout transitions, hover scale + info slide-up
 */
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { SITE_IMAGES } from '@/lib/site-images';

const KITCHEN_IMG = SITE_IMAGES.kitchen;
const BATHROOM_IMG = SITE_IMAGES.bathroom;
const EXTERIOR_IMG = SITE_IMAGES.exterior;
const BASEMENT_IMG = SITE_IMAGES.basement;
const HERO_IMG = SITE_IMAGES.galleryHero;

const categories = ['All', 'Kitchen', 'Bathroom', 'Basement', 'Exterior'];

const galleryItems = [
  { id: 1, image: KITCHEN_IMG, category: 'Kitchen', title: 'Modern Kitchen Transformation', location: 'Easton, PA' },
  { id: 2, image: BATHROOM_IMG, category: 'Bathroom', title: 'Spa Master Bathroom', location: 'Bethlehem, PA' },
  { id: 3, image: EXTERIOR_IMG, category: 'Exterior', title: 'Colonial Exterior Refresh', location: 'Phillipsburg, NJ' },
  { id: 4, image: BASEMENT_IMG, category: 'Basement', title: 'Entertainment Basement', location: 'Allentown, PA' },
  { id: 5, image: HERO_IMG, category: 'Kitchen', title: 'Open-Plan Renovation', location: 'Hackettstown, NJ' },
  { id: 6, image: BATHROOM_IMG, category: 'Bathroom', title: 'Guest Bath Remodel', location: 'Easton, PA' },
];

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-[#111827]" ref={ref}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6"
        >
          <div>
            <span className="section-label mb-3 block">Our Work</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white"
              style={{ fontFamily: 'Figtree, sans-serif', lineHeight: 1.05 }}>
              Project Gallery
            </h2>
          </div>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200"
                style={{
                  fontFamily: 'Figtree, sans-serif',
                  background: activeCategory === cat ? '#394696' : 'rgba(255,255,255,0.06)',
                  color: activeCategory === cat ? 'white' : 'rgba(255,255,255,0.5)',
                  border: activeCategory === cat ? '1px solid #394696' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/92 via-[#0d1117]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[#983631] text-xs font-bold uppercase tracking-widest"
                    style={{ fontFamily: 'Figtree, sans-serif' }}>{item.category}</span>
                  <h3 className="text-white font-black text-lg mt-1"
                    style={{ fontFamily: 'Figtree, sans-serif' }}>{item.title}</h3>
                  <p className="text-white/55 text-sm"
                    style={{ fontFamily: 'Georgia, serif' }}>{item.location}</p>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-4 right-4 w-9 h-9 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
                  <ZoomIn size={15} className="text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
