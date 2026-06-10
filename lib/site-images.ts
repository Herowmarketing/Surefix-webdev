/**
 * Site-wide imagery — conservative suburban Lehigh Valley remodeling mood.
 * Unsplash slugs must be the full `photo-{timestamp}-{hash}` id (verified HTTP 200).
 */
const M = '/manus-storage/';

const U = (slug: string) =>
  `https://images.unsplash.com/${slug}?w=1200&q=80&auto=format&fit=crop` as const;

/** Client project — Chris kitchen remodel (suburban white/grey kitchen) */
const KITCHEN_STILL = `${M}sf-kitchen-remodel.png`;

/** Client project — hardwood flooring through kitchen & dining */
const FLOORING_STILL = `${M}sf-flooring-remodel.png`;

/** Client project — finished basement (entertainment, fireplace, bar seating) */
const BASEMENT_STILL = `${M}sf-basement-remodel.png`;

/** Client project — master bathroom remodel (double vanity, glass shower, soaking tub) */
const BATHROOM_STILL = `${M}sf-bathroom-remodel.png`;

/** Client-style sunroom / home addition at dusk */
const ADDITIONS_STILL = `${M}sf-home-additions.png`;

/** Suburban-friendly stills for gallery hero tiles and walkthrough mood */
export const HERO_STILLS = {
  /** Typical suburban front elevation */
  main: U('photo-1560518883-ce09059eeffa'),
  /** Updated kitchen in a standard home */
  real: KITCHEN_STILL,
  /** Comfortable living room — everyday family space */
  walkthrough: U('photo-1600607687644-c7171b42498f'),
} as const;

/** Service cards, page heroes, and gallery thumbnails */
const SERVICE_CARD_STILLS = {
  kitchen: KITCHEN_STILL,
  bathroom: BATHROOM_STILL,
  basement: BASEMENT_STILL,
  exterior: U('photo-1570129477492-45c003edd2be'),
  additions: ADDITIONS_STILL,
} as const;

/** Home page “In-House Design Partner” block — comfortable suburban interior */
export const INTERIOR_DESIGN_HOME_IMAGE = U('photo-1600210492486-724fe5c67fb0');

/** Home page “In-House Showroom” promo block — client kitchen remodel */
export const SHOWROOM_HOME_IMAGE = KITCHEN_STILL;
/** In-House Showroom loop — `public/Sure Fix Hero Video/Hero Video Upscaled.mp4` (URL-encoded) */
export const SHOWROOM_HOME_VIDEO_SRC =
  '/Sure%20Fix%20Hero%20Video/Hero%20Video%20Upscaled.mp4';

/** Service / marketing cards (home, services page, gallery thumbnails) */
export const SITE_IMAGES = {
  kitchen: SERVICE_CARD_STILLS.kitchen,
  bathroom: SERVICE_CARD_STILLS.bathroom,
  basement: SERVICE_CARD_STILLS.basement,
  exterior: SERVICE_CARD_STILLS.exterior,
  flooring: FLOORING_STILL,
  additions: SERVICE_CARD_STILLS.additions,
  /** Living room mood for gallery hero tile */
  galleryHero: HERO_STILLS.walkthrough,
} as const;

/** Extra stills so gallery tiles are not all duplicates */
export const GALLERY_STILLS = {
  kitchen: SERVICE_CARD_STILLS.kitchen,
  bathroom: SERVICE_CARD_STILLS.bathroom,
  guestBath: U('photo-1600585154526-990dced4db0d'),
  exterior: SERVICE_CARD_STILLS.exterior,
  basement: SERVICE_CARD_STILLS.basement,
  living: HERO_STILLS.walkthrough,
} as const;

/** Showroom & material showcase — practical finishes in typical homes */
export const SHOWROOM_MATERIAL_IMAGES = {
  countertop: KITCHEN_STILL,
  flooring: FLOORING_STILL,
  tile: U('photo-1600566752355-35792bedcfea'),
  faucet: U('photo-1604709177225-055f99402ea3'),
  shower: BATHROOM_STILL,
  siding: U('photo-1570129477492-45c003edd2be'),
  roofing: U('photo-1513584684374-8bab748fbf90'),
  lvp: FLOORING_STILL,
} as const;

/** Service page hero headers */
export const SERVICE_HERO = {
  kitchen: SERVICE_CARD_STILLS.kitchen,
  bathroom: SERVICE_CARD_STILLS.bathroom,
  basement: SERVICE_CARD_STILLS.basement,
  exterior: SERVICE_CARD_STILLS.exterior,
  additions: SERVICE_CARD_STILLS.additions,
  flooring: FLOORING_STILL,
} as const;

/** Default service-detail gallery strip (six tiles) */
export const SERVICE_GALLERY_STILLS: string[] = [
  SERVICE_CARD_STILLS.kitchen,
  SERVICE_CARD_STILLS.bathroom,
  SERVICE_CARD_STILLS.exterior,
  BASEMENT_STILL,
  HERO_STILLS.walkthrough,
  SERVICE_CARD_STILLS.additions,
];

/** Kitchen Remodeling page — Our Work gallery */
export const KITCHEN_SERVICE_GALLERY: string[] = [
  `${M}sf-kitchen-portfolio-01.png`,
  `${M}sf-kitchen-portfolio-02.png`,
  `${M}sf-kitchen-portfolio-03.png`,
  `${M}sf-kitchen-portfolio-04.png`,
  `${M}sf-kitchen-portfolio-05.png`,
  KITCHEN_STILL,
];

/** Bathroom Remodeling page — Our Work gallery */
export const BATHROOM_SERVICE_GALLERY: string[] = [
  `${M}sf-bathroom-portfolio-01.jpg`,
  `${M}sf-bathroom-portfolio-02.jpg`,
  `${M}sf-bathroom-portfolio-03.jpg`,
  `${M}sf-bathroom-portfolio-04.jpg`,
  `${M}sf-bathroom-portfolio-05.jpg`,
];

/** Basement Finishing page — Our Work gallery */
export const BASEMENT_SERVICE_GALLERY: string[] = [
  `${M}sf-basement-gallery-01.jpg`,
  `${M}sf-basement-gallery-02.jpg`,
  `${M}sf-basement-gallery-03.jpg`,
  `${M}sf-basement-gallery-04.jpg`,
  `${M}sf-basement-gallery-05.jpg`,
  BASEMENT_STILL,
];

/** Exterior Remodeling page — Our Work gallery */
export const EXTERIOR_SERVICE_GALLERY: string[] = [
  `${M}sf-exterior-gallery-01.jpg`,
  `${M}sf-exterior-gallery-02.jpg`,
  `${M}sf-exterior-gallery-03.jpg`,
  `${M}sf-exterior-gallery-04.jpg`,
];

/** Home Additions page — Our Work gallery */
export const ADDITIONS_SERVICE_GALLERY: string[] = [
  `${M}sf-additions-gallery-01.jpg`,
  `${M}sf-additions-gallery-02.jpg`,
  `${M}sf-additions-gallery-03.jpg`,
  `${M}sf-additions-gallery-04.jpg`,
  `${M}sf-additions-gallery-05.jpg`,
  ADDITIONS_STILL,
];

/** Flooring page: lead with product still, then typical home interiors */
export const FLOORING_SERVICE_GALLERY: string[] = [
  FLOORING_STILL,
  HERO_STILLS.walkthrough,
  SERVICE_CARD_STILLS.kitchen,
  HERO_STILLS.main,
  FLOORING_STILL,
  BASEMENT_STILL,
];
