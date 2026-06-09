import ServicePageTemplate from '@/components/ServicePageTemplate';
import { BASEMENT_SERVICE_GALLERY, SERVICE_HERO } from '@/lib/site-images';

export default function Basement() {
  return (
    <ServicePageTemplate
      serviceId="basement"
      slug="/services/basement"
      title="Basement Finishing"
      tagline="Unlock the full potential of your home — below the surface."
      description="Your unfinished basement is your home's greatest untapped asset. A properly finished basement can add hundreds of square feet of livable space to your home — often at a fraction of the cost of a traditional addition — and significantly increases your property value. Sure-Fix Remodeling transforms raw concrete and exposed joists into beautiful, functional living spaces. Whether you want a home theater, a kids' playroom, a home gym, a wet bar, or a full in-law suite, we design and build it to match the quality of the rest of your home — with proper egress, insulation, and code-compliant electrical and plumbing."
      icon="🏠"
      heroImage={SERVICE_HERO.basement}
      features={['Full Finishing', 'Framing & Drywall', 'Electrical & Lighting', 'Plumbing Rough-In', 'Egress Windows', 'Waterproofing', 'HVAC Extension', 'Flooring']}
      galleryImages={BASEMENT_SERVICE_GALLERY}
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
