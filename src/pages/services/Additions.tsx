import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function Additions() {
  return (
    <ServicePageTemplate
      title="Home Additions"
      tagline="More space. More life. More home — seamlessly integrated."
      description="When you've outgrown your current space but love where you live, a home addition is the perfect solution. Sure-Fix Remodeling designs and builds room additions, sunrooms, garage conversions, second-story additions, and more — all engineered to blend seamlessly with your existing home's architecture. We handle everything from permits and foundation work through framing, insulation, drywall, and finish work."
      icon="🏗️"
      heroImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85"
      features={['Room Additions', 'Sunrooms', 'Garage Conversions', 'Second Story Additions', 'Mudrooms', 'Laundry Rooms', 'Permit Management', 'Structural Engineering']}
      galleryImages={[
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
        'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      ]}
      subServices={[
        { name: 'Room Additions', desc: 'Expand your living room, add a bedroom, or create a dedicated home office with a full addition.' },
        { name: 'Sunrooms & Screened Porches', desc: 'Bring the outdoors in with a custom sunroom that adds light, space, and value.' },
        { name: 'Garage Conversion', desc: 'Transform your unused garage into a studio, gym, office, or living space.' },
        { name: 'Second Story Addition', desc: 'Double your square footage by adding a full second floor to your existing home.' },
        { name: 'Mudroom Addition', desc: 'Functional entryway with built-in storage, bench seating, and durable flooring.' },
        { name: 'Laundry Room Addition', desc: 'Dedicated laundry space with proper plumbing, electrical, and cabinetry.' },
      ]}
    />
  );
}
