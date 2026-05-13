import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function Bathroom() {
  return (
    <ServicePageTemplate
      title="Bathroom Remodeling"
      tagline="Spa-quality bathrooms crafted for everyday luxury."
      description="A beautifully remodeled bathroom adds real value to your home and transforms your daily routine. Whether you're dreaming of a spa-like master bath with a walk-in shower and soaking tub, or a crisp, functional guest bath, Sure-Fix Remodeling delivers. We handle all trades in-house — tile, plumbing, electrical, and carpentry — so your project stays on schedule and under one roof."
      icon="🚿"
      heroImage="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=85"
      features={['Walk-In Showers', 'Soaking Tubs', 'Custom Vanities', 'Tile & Flooring', 'Plumbing Fixtures', 'Heated Floors', 'Frameless Glass', 'Lighting & Mirrors']}
      galleryImages={[
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
        'https://images.unsplash.com/photo-1620626011761-996317702519?w=800&q=80',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
        'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
        'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=800&q=80',
      ]}
      subServices={[
        { name: 'Master Bath Renovation', desc: 'Full transformation — walk-in shower, soaking tub, double vanity, and luxury tile work.' },
        { name: 'Walk-In Shower Conversion', desc: 'Replace your tub with a custom tiled walk-in shower with frameless glass enclosure.' },
        { name: 'Tub-to-Shower Conversion', desc: 'Quick, clean conversion that maximizes your bathroom\'s usable space.' },
        { name: 'Vanity & Fixture Upgrade', desc: 'New vanity, faucets, mirrors, and lighting that refresh the entire room instantly.' },
        { name: 'Tile Installation', desc: 'Floor-to-ceiling tile work in any pattern or material — precision-cut and perfectly set.' },
        { name: 'Accessibility Remodeling', desc: 'Walk-in tubs, grab bars, roll-in showers, and ADA-compliant layouts for aging in place.' },
      ]}
    />
  );
}
