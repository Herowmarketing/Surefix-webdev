/*
 * PER-PAGE SEO METADATA — Sure-Fix Remodeling
 *
 * Static copy lives here so we keep one canonical source for every
 * page's <title>, meta description, and OG image. Pages that take
 * dynamic params (services, locations, blog posts) pass through
 * their own data and only borrow the defaults below.
 */
import { SITE_URL } from './seo';

const M = `${SITE_URL}/manus-storage/`;

export const PAGE_SEO = {
  home: {
    title: 'Home Remodeling Easton PA — Kitchens, Baths & Forever Homes',
    description:
      'Sure-Fix Remodeling is a family-run design-build contractor in Easton, PA. Kitchens, bathrooms, basements, additions, exteriors & flooring across the Lehigh Valley. Licensed since 2008.',
    path: '/',
    image: `${M}sf-hero-main-poster.jpg`,
    imageAlt:
      'Sure-Fix Remodeling — modernized suburban home in the Lehigh Valley',
  },
  services: {
    title: 'Remodeling Services — Kitchens, Baths, Basements & Additions',
    description:
      'Full-service home remodeling from Sure-Fix: kitchens, bathrooms, basement finishing, exterior, flooring, and home additions across Easton, Bethlehem, Allentown, and Western NJ.',
    path: '/services',
    image: `${M}sf-kitchen-remodel.png`,
    imageAlt: 'Sure-Fix Remodeling kitchen project in the Lehigh Valley',
  },
  showroom: {
    title: 'Easton, PA Remodeling Showroom — Touch & Compare Materials',
    description:
      'Visit the Sure-Fix Remodeling showroom in Easton, PA to compare countertops, tile, flooring, faucets and finishes in person. Featuring Moen, Gerber and Henry brand allies.',
    path: '/showroom',
    image: `${M}sf-kitchen-remodel.png`,
    imageAlt: 'Sure-Fix Remodeling showroom in Easton, Pennsylvania',
  },
  interiorDesign: {
    title: 'Interior Design Services — Lehigh Valley & Western NJ',
    description:
      'In-house interior design from Sure-Fix Remodeling. We pair design intent with construction reality so every kitchen, bath and living space lands on the first try.',
    path: '/interior-design',
    image: `${M}sf-flooring-remodel.png`,
    imageAlt: 'Sure-Fix Remodeling interior design — comfortable suburban home',
  },
  promotions: {
    title: 'Remodeling Promotions & Financing — Sure-Fix Remodeling',
    description:
      'Current Sure-Fix Remodeling offers: year-round value pillars, seasonal bundles, gift card terms, and financing options for Lehigh Valley homeowners.',
    path: '/promotions',
    image: `${M}sf-bathroom-remodel.png`,
    imageAlt: 'Sure-Fix Remodeling promotions and financing options',
  },
  about: {
    title: 'About Sure-Fix Remodeling — Henry Rouhana, Family-Run Since 2008',
    description:
      'Henry Rouhana founded Sure-Fix Remodeling in Easton, PA in 2008. Meet the family-run team modernizing forever homes across the Lehigh Valley and Western New Jersey.',
    path: '/about',
    image: `${M}sf-basement-remodel.png`,
    imageAlt: 'Sure-Fix Remodeling team — Henry Rouhana, owner',
  },
  reviews: {
    title: 'Reviews — Lehigh Valley Homeowners on Sure-Fix Remodeling',
    description:
      'Read 400+ verified reviews of Sure-Fix Remodeling from Google, Angi, Houzz and Facebook. Family-run design-build contractor based in Easton, PA.',
    path: '/reviews',
    image: `${M}sf-kitchen-remodel.png`,
    imageAlt: 'Sure-Fix Remodeling reviews and testimonials',
  },
  contact: {
    title: 'Contact Sure-Fix Remodeling — Easton, PA (610) 392-0990',
    description:
      'Schedule a free in-home consultation with Sure-Fix Remodeling. Call (610) 392-0990 or visit our Easton, PA showroom at 2015 Freemansburg Ave.',
    path: '/contact',
    image: `${M}sf-hero-main-poster.jpg`,
    imageAlt: 'Contact Sure-Fix Remodeling in Easton, Pennsylvania',
  },
  publications: {
    title: 'Press & Publications — Sure-Fix Remodeling',
    description:
      'Featured in Forbes, Home Builder Digest, Expertise, and Houzz. Read press coverage and editorial features about Sure-Fix Remodeling.',
    path: '/publications',
    image: `${M}sf-hero-main-poster.jpg`,
    imageAlt: 'Sure-Fix Remodeling in the press',
  },
  blog: {
    title: 'Remodeling Blog — Kitchen, Bath & Home Renovation Tips',
    description:
      'Practical remodeling guidance from Sure-Fix Remodeling — kitchen, bathroom, basement, exterior and aging-in-place projects from a Lehigh Valley design-build contractor.',
    path: '/blog',
    image: `${M}sf-hero-main-poster.jpg`,
    imageAlt: 'Sure-Fix Remodeling blog — Lehigh Valley remodeling insights',
  },
  locations: {
    title: 'Service Areas — Lehigh Valley PA & Western NJ Remodeling',
    description:
      'Sure-Fix Remodeling serves Easton, Bethlehem, Allentown, Coopersburg, Center Valley, Phillipsburg, Hackettstown and Washington with full design-build remodeling.',
    path: '/locations',
    image: `${M}sf-hero-main-poster.jpg`,
    imageAlt: 'Sure-Fix Remodeling service areas across the Lehigh Valley',
  },
  notFound: {
    title: 'Page Not Found',
    description:
      'The page you’re looking for is no longer here. Browse Sure-Fix Remodeling services, locations or get in touch with our Easton, PA office.',
    path: '/404',
    image: `${M}sf-hero-main-poster.jpg`,
    imageAlt: 'Sure-Fix Remodeling',
  },
} as const;

/* Per-service SEO copy — keyed by the SERVICES[id] from constants.ts */
export const SERVICE_SEO: Record<
  string,
  { title: string; description: string; imageAlt: string }
> = {
  kitchen: {
    title: 'Kitchen Remodeling Easton PA — Custom Cabinets & Countertops',
    description:
      'Custom kitchen remodeling in Easton, Bethlehem, Allentown and the Lehigh Valley. Cabinets, quartz/granite countertops, islands, backsplash, lighting and full gut renovations.',
    imageAlt: 'Sure-Fix Remodeling — kitchen remodel in the Lehigh Valley',
  },
  bathroom: {
    title: 'Bathroom Remodeling Easton PA — Walk-In Showers & Tile',
    description:
      'Bathroom remodeling and renovation across the Lehigh Valley and Western NJ. Walk-in showers, soaking tubs, custom vanities, heated floors, and aging-in-place upgrades.',
    imageAlt: 'Sure-Fix Remodeling — bathroom remodel with tile and vanity',
  },
  basement: {
    title: 'Basement Finishing Lehigh Valley — Family Rooms, Suites & Bars',
    description:
      'Full basement finishing in Easton, Bethlehem and Allentown. Family rooms, in-law suites, home theaters, gyms, wet bars, and code-compliant egress windows.',
    imageAlt: 'Sure-Fix Remodeling — finished basement in the Lehigh Valley',
  },
  exterior: {
    title: 'Exterior Remodeling Lehigh Valley — Siding, Roofing, Decks',
    description:
      'Exterior remodeling from Sure-Fix: roofing, siding, windows, doors, decks, gazebos, and hardscaping in Easton, Bethlehem and Allentown, PA.',
    imageAlt: 'Sure-Fix Remodeling — exterior renovation in the Lehigh Valley',
  },
  flooring: {
    title: 'Flooring Installation Easton PA — Hardwood, LVP & Tile',
    description:
      'Flooring installation across the Lehigh Valley: hardwood, luxury vinyl plank, ceramic and porcelain tile, carpet, laminate, and subfloor repair from Sure-Fix Remodeling.',
    imageAlt: 'Sure-Fix Remodeling — flooring installation project',
  },
  additions: {
    title: 'Home Additions Lehigh Valley — Sunrooms, Mudrooms & 2nd Story',
    description:
      'Design-build home additions in the Lehigh Valley and Western NJ. Room additions, sunrooms, second story additions, garage conversions, mudrooms and laundry rooms.',
    imageAlt: 'Sure-Fix Remodeling — home addition in the Lehigh Valley',
  },
};
