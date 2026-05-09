import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function Exterior() {
  return (
    <ServicePageTemplate
      title="Exterior Remodeling"
      tagline="Stunning curb appeal, built to last through every season."
      description="Your home's exterior is its first impression — and it's your first line of defense against the elements. Sure-Fix Remodeling offers complete exterior transformation services including roofing, siding, windows, doors, decks, patios, gazebos, and hardscaping. We use premium materials rated for the Lehigh Valley climate and back every project with a comprehensive warranty. From a new roof to a full outdoor living space, we do it all."
      icon="🏡"
      heroImage="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&q=85"
      features={['Roofing', 'Siding', 'Windows & Doors', 'Decks & Patios', 'Gazebos & Pavilions', 'Hardscaping', 'Gutters & Fascia', 'Exterior Painting']}
      galleryImages={[
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
        'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      ]}
      subServices={[
        { name: 'Roofing', desc: 'Asphalt shingle, metal, and flat roof installation, repair, and full replacement with warranty.' },
        { name: 'Siding', desc: 'Vinyl, fiber cement, and wood siding that protects your home and elevates its appearance.' },
        { name: 'Windows & Doors', desc: 'Energy-efficient replacement windows and entry doors that reduce utility bills and boost curb appeal.' },
        { name: 'Decks & Patios', desc: 'Custom wood, composite, and Trex decks with built-in seating, lighting, and railings.' },
        { name: 'Gazebos & Pavilions', desc: 'Custom-built outdoor structures for shade, entertaining, and year-round enjoyment.' },
        { name: 'Hardscaping & Landscaping', desc: 'Retaining walls, walkways, patios, and landscape design that complete your outdoor living space.' },
      ]}
    />
  );
}
