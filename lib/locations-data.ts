/**
 * LOCATIONS DATA — Sure-Fix Remodeling service area pages.
 *
 * Each entry powers /locations (hub) and /locations/:slug (detail).
 * Keep copy local, specific, and unique per city — this is the SEO surface.
 */

export type LocationKey = {
  readonly slug: string;
  readonly city: string;
  readonly state: 'PA' | 'NJ' | 'NY';
  readonly county: string;
  readonly displayName: string;
  /** Short marketing tagline that appears below the city name on the hub card */
  readonly tagline: string;
  /** Two-three sentence local intro on the detail page */
  readonly intro: string;
  /** Hyperlocal touches — historic district, micro-neighborhoods, landmarks */
  readonly highlights: readonly string[];
  /** Most-requested projects in the area (drives FAQ + service tiles) */
  readonly featuredServices: readonly string[];
  /** Quick differentiators (drive time, brand allies, permitting know-how) */
  readonly logistics: readonly string[];
  /** SEO meta description — kept under 160 chars when possible */
  readonly meta: string;
};

export const LOCATIONS: readonly LocationKey[] = [
  {
    slug: 'easton-pa',
    city: 'Easton',
    state: 'PA',
    county: 'Northampton',
    displayName: 'Easton, Pennsylvania',
    tagline: 'Our home base — and the Lehigh Valley showroom you can walk into.',
    intro:
      'Easton is where Sure-Fix was founded in 2008. Our 2015 Freemansburg Ave showroom anchors every project we touch — from College Hill row homes to West Easton Victorians. We know the borough permit calendar, the historic-district nuances, and how to source materials that hold up to four-season weather.',
    highlights: ['College Hill', 'West Ward historic district', 'Downtown Easton', 'Wilson Borough'],
    featuredServices: ['Kitchen remodels', 'Whole-home additions', 'Historic-home restoration', 'Aging-in-place renovations'],
    logistics: [
      'In-house Easton showroom — Moen, Gerber, Kohler & Cambria on display',
      'Walking-distance project visits across College Hill & Downtown',
      'Northampton County permit experience',
    ],
    meta:
      'Sure-Fix Remodeling — Easton, PA general contractor and design-build firm. In-house showroom, kitchen & bath remodels, additions, and historic-home renovations.',
  },
  {
    slug: 'bethlehem-pa',
    city: 'Bethlehem',
    state: 'PA',
    county: 'Northampton / Lehigh',
    displayName: 'Bethlehem, Pennsylvania',
    tagline: 'Steel-stack character, modern comfort.',
    intro:
      'From West Bethlehem twin homes to Mt. Airy and Bridle Path estates, Bethlehem clients trust Sure-Fix to balance period detail with the modernization a forever home requires. We work seamlessly with the city Historic Conservation Commission when projects sit inside the historic district.',
    highlights: ['Historic District', 'Mt. Airy', 'Bridle Path Estates', 'Saucon Park area'],
    featuredServices: ['Kitchen & bath remodels', 'Primary-suite additions', 'Energy-efficient window & door packages', 'Basement finishing'],
    logistics: [
      'Lehigh & Northampton County permit experience',
      'Cambria, James Hardie & Andersen materials in stock',
      '20-minute drive from showroom',
    ],
    meta:
      'Sure-Fix Remodeling — Bethlehem, PA contractor specializing in kitchen, bath, addition, and full-home remodels. Historic-district experience.',
  },
  {
    slug: 'allentown-pa',
    city: 'Allentown',
    state: 'PA',
    county: 'Lehigh',
    displayName: 'Allentown, Pennsylvania',
    tagline: 'Big-city plans, small-firm accountability.',
    intro:
      'Allentown homeowners get the reliability of a high-end firm without the inflated overhead. Sure-Fix runs full design-build projects across the West End, Trexler Park, and South Mountain — paired with the communication and accountability you only get from a family-run team.',
    highlights: ['West End', 'Trexler Park', 'South Mountain', 'Cedar Crest corridor'],
    featuredServices: ['Whole-home additions', 'Kitchen remodels', 'Forever-home modernization', 'Exterior + roofing renewals'],
    logistics: [
      'Lehigh County permit fluency',
      'Direct sourcing through Moen, Gerber, Cambria, GAF',
      '25-minute drive from Easton showroom',
    ],
    meta:
      'Sure-Fix Remodeling — Allentown, PA design-build firm. Kitchens, baths, additions, exterior, and aging-in-place renovations from a family-run team.',
  },
  {
    slug: 'coopersburg-pa',
    city: 'Coopersburg',
    state: 'PA',
    county: 'Lehigh',
    displayName: 'Coopersburg, Pennsylvania',
    tagline: 'Borough charm, estate-level execution.',
    intro:
      'Coopersburg projects pair small-borough character with the standards of a high-end design-build firm. Sure-Fix runs the full transformation — from initial walk-through to last finished trim — so homeowners along Main Street and the surrounding farmsteads don’t have to coordinate three different vendors to get their forever home modernized.',
    highlights: ['Main Street borough', 'Limeport / Coopersburg estates', 'Lehigh-Bucks county line homes'],
    featuredServices: ['Forever-home modernization', 'Aging-in-place remodels', 'Kitchen & primary-bath transformations', 'Additions & accessory dwellings'],
    logistics: [
      'Lehigh County permitting & inspections handled in-house',
      'Quick access to our Easton showroom & material library',
      'Moen, Gerber, and Henry-brand alliances apply locally',
    ],
    meta:
      'Sure-Fix Remodeling — Coopersburg, PA design-build remodeler. Kitchens, baths, additions, and aging-in-place renovations with a family-run process.',
  },
  {
    slug: 'center-valley-pa',
    city: 'Center Valley',
    state: 'PA',
    county: 'Lehigh',
    displayName: 'Center Valley, Pennsylvania',
    tagline: 'Premier neighborhoods. Personal renovation team.',
    intro:
      'Saucon Valley, Promenade Shops at Saucon Valley, and the executive enclaves around Center Valley deserve a contractor who matches the address. Sure-Fix brings reliability, brand-allied materials, and total project ownership — without the overhead inflation of an out-of-town luxury firm.',
    highlights: ['Saucon Valley', 'Promenade Shops corridor', 'Saucon Creek estates'],
    featuredServices: ['Estate-scale additions', 'Custom kitchen design', 'Spa-quality bath suites', 'Outdoor living & decks'],
    logistics: [
      'Lehigh County permits & HOA coordination',
      'White-glove project communication',
      '15-minute reach from our Easton showroom',
    ],
    meta:
      'Sure-Fix Remodeling — Center Valley & Saucon Valley, PA renovations. Kitchen, bath, addition, and outdoor-living design-build for premier neighborhoods.',
  },
  {
    slug: 'phillipsburg-nj',
    city: 'Phillipsburg',
    state: 'NJ',
    county: 'Warren',
    displayName: 'Phillipsburg, New Jersey',
    tagline: 'Across the river — same family, same standards.',
    intro:
      'Phillipsburg homeowners — from the historic downtown to Lopatcong and the river-view neighborhoods — trust Sure-Fix to handle Warren County permitting, river-corridor exterior work, and modern interior overhauls with the same care they’d get in Easton.',
    highlights: ['Historic Downtown', 'Lopatcong border', 'Riverbluff & Marble Hill'],
    featuredServices: ['Kitchen & bath remodels', 'Historic-home preservation', 'Decks & outdoor living', 'Window & door energy upgrades'],
    logistics: [
      'Warren County permits handled in-house',
      'Bridge-distance from our showroom — fast site visits',
      'NJ-licensed & insured',
    ],
    meta:
      'Sure-Fix Remodeling — Phillipsburg, NJ home remodeling firm. Kitchens, baths, additions, and historic-home renovations across Warren County.',
  },
  {
    slug: 'hackettstown-nj',
    city: 'Hackettstown',
    state: 'NJ',
    county: 'Warren / Morris',
    displayName: 'Hackettstown, New Jersey',
    tagline: 'Small-town footprint. Big-build capability.',
    intro:
      'Whether you’re modernizing a Main Street colonial or planning a full second-story addition off Allamuchy Road, Sure-Fix delivers a design-build process built for forever homes. We carry the heavy logistics so you don’t have to.',
    highlights: ['Hackettstown center', 'Allamuchy Road corridor', 'Independence Township border'],
    featuredServices: ['Second-story additions', 'Aging-in-place remodels', 'Kitchen & bath transformations', 'Energy-efficient window packages'],
    logistics: [
      'Warren & Morris county permitting',
      'Brand-allied sourcing — Moen, Gerber, Cambria',
      'Direct project manager — one number, every day',
    ],
    meta:
      'Sure-Fix Remodeling — Hackettstown, NJ design-build remodeler. Kitchens, baths, additions, and forever-home modernization in Warren & Morris counties.',
  },
  {
    slug: 'washington-nj',
    city: 'Washington',
    state: 'NJ',
    county: 'Warren',
    displayName: 'Washington, New Jersey',
    tagline: 'Heritage homes, future-ready interiors.',
    intro:
      'From Washington Borough Victorians to Mansfield Township ranches, Sure-Fix pairs trade-craft with forever-home thinking — necessary infrastructure updates alongside the lifestyle improvements you actually want to live with.',
    highlights: ['Washington Borough', 'Mansfield Township', 'Route 31 corridor'],
    featuredServices: ['Whole-home modernization', 'Kitchen & bath remodels', 'Mudroom & laundry additions', 'Exterior renewal'],
    logistics: [
      'Warren County permitting fluency',
      'NJ-licensed, fully insured',
      'Brand-allied materials in stock at our PA showroom',
    ],
    meta:
      'Sure-Fix Remodeling — Washington, NJ home remodeling firm. Kitchen, bath, addition, and forever-home modernization with a family-run team.',
  },
] as const;

export function getLocation(slug: string): LocationKey | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
