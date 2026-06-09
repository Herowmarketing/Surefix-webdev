import ServicePageTemplate from '@/components/ServicePageTemplate';
import { ADDITIONS_SERVICE_GALLERY, SERVICE_HERO } from '@/lib/site-images';

export default function Additions() {
  return (
    <ServicePageTemplate
      serviceId="additions"
      slug="/services/additions"
      title="Home Additions"
      tagline="More space. More life. More home — seamlessly integrated."
      description="When you've outgrown your current space but love where you live, a home addition is the perfect solution. Whether you need a new bedroom, a sunroom, a dedicated in-law suite for aging-in-place, or a full second story, Sure-Fix Remodeling designs and builds additions that blend seamlessly with your existing home's architecture. We handle everything from permits and foundation work through framing, insulation, drywall, and finish work — so your new space looks and feels like it was always part of your home."
      icon="🏗️"
      heroImage={SERVICE_HERO.additions}
      features={['Room Additions', 'In-Law Suites', 'Sunrooms', 'Garage Conversions', 'Second Story Additions', 'Mudrooms', 'Permit Management', 'Structural Engineering']}
      galleryImages={ADDITIONS_SERVICE_GALLERY}
      subServices={[
        { name: 'In-Law Suite Addition', desc: 'A private, self-contained living space with bedroom, bathroom, and kitchenette — ideal for aging parents or extended family.' },
        { name: 'Room Additions', desc: 'Expand your living room, add a bedroom, or create a dedicated home office with a full addition.' },
        { name: 'Sunrooms & Screened Porches', desc: 'Bring the outdoors in with a custom sunroom that adds light, space, and year-round enjoyment.' },
        { name: 'Garage Conversion', desc: 'Transform your unused garage into a studio, gym, office, or living space.' },
        { name: 'Second Story Addition', desc: 'Double your square footage by adding a full second floor to your existing home.' },
        { name: 'Mudroom Addition', desc: 'Functional entryway with built-in storage, bench seating, and durable flooring.' },
      ]}
    />
  );
}
