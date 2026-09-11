/*
 * SERVICE PAGE TEMPLATE — Sure-Fix Remodeling
 * Reusable template for all service pages
 * Sections: Hero → Features → Process → Gallery → CTA
 */
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { useSeo, breadcrumbList, serviceSchema, SITE_URL } from '@/lib/seo';
import { SERVICE_SEO } from '@/lib/seo-config';
import KitchenPromotionSection from '@/components/KitchenPromotionSection';
import PhoneLink from '@/components/PhoneLink';

interface ServicePageProps {
  title: string;
  tagline: string;
  description: string;
  icon: string;
  heroImage: string;
  features: string[];
  galleryImages: string[];
  subServices?: { name: string; desc: string }[];
  accentColor?: string;
  /** Service id matching SERVICES[].id in constants.ts (kitchen, bathroom, basement, exterior, flooring, additions). */
  serviceId: 'kitchen' | 'bathroom' | 'basement' | 'exterior' | 'flooring' | 'additions';
  /** URL path for the page, used for canonical + breadcrumbs (e.g. "/services/kitchen"). */
  slug: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ServicePageTemplate({
  title, tagline, description, icon, heroImage, features, galleryImages, subServices, accentColor = '#394696',
  serviceId, slug,
}: ServicePageProps) {
  const { openStepper, openKitchenPromoStepper } = useLeadStepper();
  const openServiceStepper = (source: string) => {
    if (serviceId === 'kitchen') openKitchenPromoStepper(source);
    else openStepper(serviceId);
  };

  const seoCopy = SERVICE_SEO[serviceId];
  const absoluteHeroImage = heroImage.startsWith('http')
    ? heroImage
    : `${SITE_URL}${heroImage.startsWith('/') ? heroImage : `/${heroImage}`}`;

  useSeo({
    title: seoCopy?.title ?? `${title} | Sure-Fix Remodeling`,
    rawTitle: !!seoCopy,
    description: seoCopy?.description ?? description.slice(0, 158),
    path: slug,
    image: absoluteHeroImage,
    imageAlt: seoCopy?.imageAlt ?? `Sure-Fix Remodeling — ${title.toLowerCase()}`,
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: title, path: slug },
      ]),
      serviceSchema({
        name: title,
        slug,
        description: description,
        image: absoluteHeroImage,
        serviceType: title,
      }),
      {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: `${title} — Service Catalog`,
        itemListElement: (subServices ?? []).map((s, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: {
            '@type': 'Service',
            name: s.name,
            description: s.desc,
          },
        })),
      },
    ],
  });

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden">
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.97) 0%, rgba(13,17,23,0.6) 50%, rgba(13,17,23,0.2) 100%)' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-8 pb-16 pt-32">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
              <Link href="/services">
                <span className="text-xs font-bold text-white/40 hover:text-white/70 transition-colors cursor-pointer uppercase tracking-widest" style={{ fontFamily: 'Figtree, sans-serif' }}>
                  Services
                </span>
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-xs font-bold text-[#394696] uppercase tracking-widest" style={{ fontFamily: 'Figtree, sans-serif' }}>{title}</span>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="flex items-center gap-4 mb-3">
              <span className="text-5xl">{icon}</span>
              <h1 className="text-4xl md:text-6xl font-black text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>{title}</h1>
            </motion.div>
            <motion.p variants={fadeUp} custom={2} className="text-xl text-white/60 max-w-2xl" style={{ fontFamily: 'Georgia, serif' }}>{tagline}</motion.p>
          </motion.div>
        </div>
      </section>

      {serviceId === 'kitchen' ? (
        <KitchenPromotionSection source="kitchen-service-primary" className="bg-slate-50" />
      ) : null}

      {/* ─── DESCRIPTION + FEATURES ─── */}
      <section className="py-20 px-5 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Description */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest mb-4" style={{ fontFamily: 'Figtree, sans-serif', color: accentColor }}>
              About This Service
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="text-slate-700 text-lg leading-relaxed mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              {description}
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row gap-3">
              <motion.button
                  type="button"
                  onClick={() => openServiceStepper(`${serviceId}-service-about`)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider"
                  style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', border: 'none' }}
                >
                  {serviceId === 'kitchen' ? 'Claim Kitchen Savings' : 'Get Free Estimate'} <ArrowRight size={15} />
                </motion.button>
              <PhoneLink>
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-black text-slate-700 cursor-pointer border border-slate-300 bg-white"
                >
                  <Phone size={14} /> {BUSINESS.phone}
                </motion.span>
              </PhoneLink>
            </motion.div>
          </motion.div>

          {/* Right: Features */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest mb-6 text-slate-500" style={{ fontFamily: 'Figtree, sans-serif' }}>
              What's Included
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <motion.div key={feature} variants={fadeUp} custom={i}
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <CheckCircle size={16} style={{ color: accentColor, flexShrink: 0 }} />
                  <span className="text-sm font-bold text-slate-800" style={{ fontFamily: 'Figtree, sans-serif' }}>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SUB-SERVICES (optional) ─── */}
      {subServices && subServices.length > 0 && (
        <section className="py-16 px-5 lg:px-8 border-t border-slate-200" style={{ background: 'rgba(57,70,150,0.04)' }}>
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} custom={0} className="text-3xl font-black text-slate-900 mb-10 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
                Everything We Offer
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {subServices.map((sub, i) => (
                  <motion.div key={sub.name} variants={fadeUp} custom={i}
                    className="p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:border-[#394696]/40 transition-colors">
                    <h3 className="text-lg font-black text-slate-900 mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>{sub.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{sub.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── GALLERY ─── */}
      {galleryImages.length > 0 && (
        <section className="py-16 px-5 lg:px-8 max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl font-black text-slate-900 mb-8 text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
              Our Work
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {galleryImages.map((img, i) => (
                <motion.div key={i} variants={fadeUp} custom={i}
                  whileHover={{ scale: 1.02 }}
                  className="aspect-video rounded-xl overflow-hidden">
                  <img src={img} alt={`${title} project ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── CTA BANNER ─── */}
      <section className="py-16 px-5 lg:px-8" style={{ background: accentColor }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
              {serviceId === 'kitchen' ? 'Ready to Save on Your New Kitchen?' : 'Ready to Get Started?'}
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/75 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              {serviceId === 'kitchen'
                ? 'Start your kitchen plan now and claim 10% off, up to $2,000.'
                : "Schedule a free in-home consultation and let's bring your vision to life."}
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4">
              <motion.button
                  type="button"
                  onClick={() => openServiceStepper(`${serviceId}-service-bottom`)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider"
                  style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', border: 'none' }}
                >
                  {serviceId === 'kitchen' ? 'Claim Kitchen Savings' : 'Get Free Estimate'} <ArrowRight size={15} />
                </motion.button>
              <PhoneLink>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-black text-white cursor-pointer border-2 border-white/30"
                  style={{ fontFamily: 'Figtree, sans-serif', background: 'rgba(255,255,255,0.1)' }}
                >
                  <Phone size={14} /> {BUSINESS.phone}
                </motion.span>
              </PhoneLink>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
