/*
 * SERVICES SECTION — Sure-Fix Remodeling
 * Design: Dark bg with image-card bento grid, hover zoom + overlay reveal
 * UI/UX Pro Max: Staggered card entrance, image parallax on hover
 * Colours: Deep navy bg, brand blue/red accents
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChefHat, Bath, Layers, Home, Plus, Grid3X3, ArrowRight } from 'lucide-react';

const KITCHEN_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663124064998/oX6AzgUJ6qB7NevriQFeP6/surefix-kitchen-4TuR3Gtbkt7nNou7D4ko2f.webp';
const BATHROOM_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663124064998/oX6AzgUJ6qB7NevriQFeP6/surefix-bathroom-AvWrM5S4Es5Q5KaVGZA77r.webp';
const EXTERIOR_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663124064998/oX6AzgUJ6qB7NevriQFeP6/surefix-exterior-FzNPNjKcmCYYWuWeTDxk9o.webp';
const BASEMENT_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663124064998/oX6AzgUJ6qB7NevriQFeP6/surefix-basement-ZxCZPt477MLogdT8LoXXkq.webp';

const services = [
  {
    icon: ChefHat,
    title: 'Kitchen Remodeling',
    description: 'Custom cabinetry to complete gut renovations. We design kitchens that become the heart of your home.',
    image: KITCHEN_IMG,
    color: '#394696',
    large: true,
  },
  {
    icon: Bath,
    title: 'Bathroom Renovation',
    description: 'Spa-worthy bathrooms with premium tile, fixtures, and finishes.',
    image: BATHROOM_IMG,
    color: '#983631',
    large: false,
  },
  {
    icon: Layers,
    title: 'Basement Finishing',
    description: 'Transform unused space into living areas, home theaters, or offices.',
    image: BASEMENT_IMG,
    color: '#394696',
    large: false,
  },
  {
    icon: Home,
    title: 'Exterior & Siding',
    description: 'Boost curb appeal with new siding, windows, and exterior upgrades.',
    image: EXTERIOR_IMG,
    color: '#983631',
    large: false,
  },
  {
    icon: Plus,
    title: 'Home Additions',
    description: 'Seamless additions that match your home\'s architecture and expand your living space.',
    image: null,
    color: '#394696',
    large: false,
  },
  {
    icon: Grid3X3,
    title: 'Flooring & Tile',
    description: 'Hardwood, luxury vinyl, tile, and more — expert installation for every room.',
    image: null,
    color: '#983631',
    large: false,
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        background: service.image ? 'transparent' : 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {service.image ? (
        /* Image card */
        <div className="relative h-72 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent" />
          {/* Icon badge */}
          <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: service.color, boxShadow: `0 4px 16px ${service.color}60` }}>
            <service.icon size={18} className="text-white" />
          </div>
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-black text-white mb-1.5"
              style={{ fontFamily: 'Figtree, sans-serif' }}>{service.title}</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-4"
              style={{ fontFamily: 'Georgia, serif' }}>{service.description}</p>
            <motion.div
              className="flex items-center gap-2 text-sm font-bold"
              style={{ color: service.color, fontFamily: 'Figtree, sans-serif' }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Learn More <ArrowRight size={14} />
            </motion.div>
          </div>
        </div>
      ) : (
        /* No-image card */
        <div className="p-7 h-full flex flex-col">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{ background: `${service.color}18`, border: `1px solid ${service.color}35` }}>
            <service.icon size={22} style={{ color: service.color }} />
          </div>
          <h3 className="text-xl font-black text-white mb-3"
            style={{ fontFamily: 'Figtree, sans-serif' }}>{service.title}</h3>
          <p className="text-white/55 text-sm leading-relaxed flex-1"
            style={{ fontFamily: 'Georgia, serif' }}>{service.description}</p>
          <motion.div
            className="flex items-center gap-2 text-sm font-bold mt-5"
            style={{ color: service.color, fontFamily: 'Figtree, sans-serif' }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            Learn More <ArrowRight size={14} />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="py-24 bg-[#0d1117]" ref={ref}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 max-w-2xl"
        >
          <span className="section-label mb-4 block">What We Do</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5"
            style={{ fontFamily: 'Figtree, sans-serif', lineHeight: 1.05 }}>
            Complete Home Renovation Services
          </h2>
          <p className="text-white/55 text-lg leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}>
            From a single bathroom refresh to a whole-home transformation — we handle every detail with precision and care.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
          className="mt-14 text-center"
        >
          <p className="text-white/45 mb-5 text-sm" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, letterSpacing: '0.04em' }}>
            Don't see your project? We handle custom requests too.
          </p>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Discuss Your Project <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
