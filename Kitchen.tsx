import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function Kitchen() {
  return (
    <ServicePageTemplate
      title="Kitchen Remodeling"
      tagline="Transform your kitchen into the heart of your home — custom, functional, and stunning."
      description="Your kitchen is the most-used room in your home, and it deserves to reflect your style and support the way you live. At Sure-Fix Remodeling, we handle everything from full gut renovations to cabinet refacing and countertop upgrades. Our team works with you from the first design consultation through final installation, ensuring every detail is exactly right. We use premium materials, precision craftsmanship, and a process built around your timeline and budget."
      icon="🍳"
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663124064998/oX6AzgUJ6qB7NevriQFeP6/kitchen-hero-H3rEwnVXbffsPicRB3vxka.png"
      features={['Custom Cabinetry', 'Countertop Installation', 'Kitchen Islands', 'Backsplash Tile', 'Appliance Integration', 'Lighting Design', 'Plumbing Rough-In', 'Flooring']}
      galleryImages={[
        'https://d2xsxph8kpxj0f.cloudfront.net/310519663124064998/oX6AzgUJ6qB7NevriQFeP6/kitchen-hero-ewZoeNJWW3jvQdSAq9E48V.webp',
        'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
      ]}
      subServices={[
        { name: 'Full Kitchen Renovation', desc: 'Complete gut and rebuild — new layout, cabinets, counters, flooring, and fixtures.' },
        { name: 'Cabinet Refacing', desc: 'New doors, drawer fronts, and hardware on existing cabinet boxes for a fraction of the cost.' },
        { name: 'Countertop Replacement', desc: 'Quartz, granite, marble, or butcher block — installed perfectly to your specifications.' },
        { name: 'Kitchen Island Addition', desc: 'Custom islands for prep space, seating, and storage that transform your kitchen\'s function.' },
        { name: 'Backsplash Installation', desc: 'Subway tile, mosaic, or large-format porcelain — we install it all with precision.' },
        { name: 'Open Concept Conversion', desc: 'Remove walls and open your kitchen to the living space for a modern, airy feel.' },
      ]}
    />
  );
}
