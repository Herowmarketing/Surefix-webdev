import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function Flooring() {
  return (
    <ServicePageTemplate
      title="Flooring"
      tagline="The foundation of every beautiful room — installed with precision."
      description="Flooring sets the tone for your entire home. Sure-Fix Remodeling installs hardwood, luxury vinyl plank, ceramic and porcelain tile, carpet, and laminate throughout your home. We also handle subfloor repair and leveling to ensure a perfect, long-lasting installation. Our team works with premium brands including Adura Luxury Vinyl — a product we proudly stand behind for its durability, beauty, and value."
      icon="🪵"
      heroImage="/manus-storage/surefix-flooring_ffbe994e.jpg"
      features={['Hardwood Installation', 'Luxury Vinyl Plank', 'Ceramic & Porcelain Tile', 'Carpet', 'Laminate', 'Subfloor Repair', 'Stair Treads', 'Transition Strips']}
      galleryImages={[
        '/manus-storage/surefix-flooring_ffbe994e.jpg',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
        'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      ]}
      subServices={[
        { name: 'Hardwood Flooring', desc: 'Solid and engineered hardwood installation and refinishing for timeless beauty.' },
        { name: 'Luxury Vinyl Plank', desc: 'Waterproof, durable LVP including Adura — perfect for kitchens, baths, and basements.' },
        { name: 'Tile Installation', desc: 'Ceramic, porcelain, and natural stone tile for floors, showers, and backsplashes.' },
        { name: 'Carpet Installation', desc: 'Soft, comfortable carpet for bedrooms and living areas with professional padding.' },
        { name: 'Laminate Flooring', desc: 'Budget-friendly laminate that looks like hardwood — installed clean and level.' },
        { name: 'Subfloor Repair', desc: 'Squeak elimination, leveling, and structural repair before any new floor goes down.' },
      ]}
    />
  );
}
