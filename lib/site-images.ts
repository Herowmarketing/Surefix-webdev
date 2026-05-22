/**
 * Site-wide imagery — conservative suburban Lehigh Valley remodeling mood.
 * Unsplash slugs must be the full `photo-{timestamp}-{hash}` id (verified HTTP 200).
 */
const M = '/manus-storage/';

const U = (slug: string) =>
  `https://images.unsplash.com/${slug}?w=1200&q=80&auto=format&fit=crop` as const;

/** Client project — Chris kitchen remodel (suburban white/grey kitchen) */
const KITCHEN_STILL = `${M}sf-kitchen-remodel.png`;

/** Suburban-friendly stills for gallery hero tiles and walkthrough mood */
export const HERO_STILLS = {
  /** Typical suburban front elevation */
  main: U('photo-1560518883-ce09059eeffa'),
  /** Updated kitchen in a standard home */
  real: KITCHEN_STILL,
  /** Comfortable living room — everyday family space */
  walkthrough: U('photo-1600607687644-c7171b42498f'),
} as const;

const BASEMENT_STILL = U('photo-1778731660267-3dad0ce72315');

/** Service cards, page heroes, and gallery thumbnails */
const SERVICE_CARD_STILLS = {
  kitchen: KITCHEN_STILL,
  bathroom: U('photo-1583847268964-b28dc8f51f92'),
  basement: BASEMENT_STILL,
  exterior: U('photo-1570129477492-45c003edd2be'),
  additions: U('photo-1600585154340-be6161a56a0c'),
} as const;

const FLOORING_STILL = U('photo-1600607687939-ce8a6c25118c');

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
  shower: U('photo-1600047509358-9dc75507daeb'),
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

/** Flooring page: lead with product still, then typical home interiors */
export const FLOORING_SERVICE_GALLERY: string[] = [
  FLOORING_STILL,
  HERO_STILLS.walkthrough,
  SERVICE_CARD_STILLS.kitchen,
  HERO_STILLS.main,
  FLOORING_STILL,
  BASEMENT_STILL,
];
