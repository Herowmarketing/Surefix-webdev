import ServicePageTemplate from '@/components/ServicePageTemplate';
import { SERVICE_GALLERY_STILLS, SERVICE_HERO } from '@/lib/site-images';

export default function Additions() {
  return (
    <ServicePageTemplate
      title="Home Additions"
      tagline="More space. More life. More home — seamlessly integrated."
      description="When you've outgrown your current space but love where you live, a home addition is the perfect solution. Sure-Fix Remodeling designs and builds room additions, sunrooms, garage conversions, second-story additions, and more — all engineered to blend seamlessly with your existing home's architecture. We handle everything from permits and foundation work through framing, insulation, drywall, and finish work."
      icon="🏗️"
      heroImage={SERVICE_HERO.additions}
      features={['Room Additions', 'Sunrooms', 'Garage Conversions', 'Second Story Additions', 'Mudrooms', 'Laundry Rooms', 'Permit Management', 'Structural Engineering']}
      galleryImages={SERVICE_GALLERY_STILLS}
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
