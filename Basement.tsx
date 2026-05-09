import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function Basement() {
  return (
    <ServicePageTemplate
      title="Basement Finishing"
      tagline="Unlock the full potential of your home — below the surface."
      description="Your unfinished basement is your home's greatest untapped asset. Sure-Fix Remodeling transforms raw concrete and exposed joists into beautiful, functional living spaces. Whether you want a home theater, a kids' playroom, a home gym, a wet bar, or a full in-law suite, we design and build it to match the quality of the rest of your home — with proper egress, insulation, and code-compliant electrical and plumbing."
      icon="🏠"
      heroImage="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=85"
      features={['Full Finishing', 'Framing & Drywall', 'Electrical & Lighting', 'Plumbing Rough-In', 'Egress Windows', 'Waterproofing', 'HVAC Extension', 'Flooring']}
      galleryImages={[
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
        'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
        'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      ]}
      subServices={[
        { name: 'Home Theater', desc: 'Dedicated media room with acoustic treatment, tiered seating, and custom AV integration.' },
        { name: 'In-Law Suite', desc: 'Full bedroom, bathroom, and kitchenette — a private, code-compliant living space.' },
        { name: 'Home Gym', desc: 'Rubber flooring, mirrors, proper ventilation, and electrical for your equipment.' },
        { name: 'Wet Bar & Entertainment', desc: 'Custom bar with sink, cabinetry, mini-fridge, and tile backsplash for entertaining.' },
        { name: 'Home Office', desc: 'Quiet, well-lit workspace with built-in shelving, data ports, and proper HVAC.' },
        { name: 'Waterproofing', desc: 'Interior and exterior waterproofing solutions to keep your basement dry year-round.' },
      ]}
    />
  );
}
