/**
 * Site-wide imagery — conservative suburban Lehigh Valley remodeling mood.
 * Stock stills (Unsplash) for service cards, heroes, gallery, and showroom.
 * Avoids luxury/estate visuals in favor of typical single-family homes.
 */
const U = (path: string) =>
  `https://images.unsplash.com/${path}?w=1200&q=80&auto=format&fit=crop` as const;

/** Suburban-friendly stills for gallery hero tiles and walkthrough mood */
export const HERO_STILLS = {
  /** Typical suburban front elevation */
  main: U('photo-1564013799919-ab6000279886'),
  /** Updated kitchen in a standard home */
  real: U('photo-1556912173-671ef175e48c'),
  /** Comfortable living room — everyday family space */
  walkthrough: U('photo-1560185127-8720d5b717d8'),
} as const;

const BASEMENT_STILL = U('photo-1502672260266-1c1ef2e93688');

/** Service cards, page heroes, and gallery thumbnails */
const SERVICE_CARD_STILLS = {
  kitchen: U('photo-1556912173-671ef175e48c'),
  bathroom: U('photo-1620626011761-996a0fcc9cee'),
  basement: BASEMENT_STILL,
  exterior: U('photo-1570129477492-45c003edd2be'),
  additions: U('photo-1568605114967-8130f3a36993'),
} as const;

const FLOORING_STILL = U('photo-1503387762-592dee58ee84');

/** Home page “In-House Design Partner” block — comfortable suburban interior */
export const INTERIOR_DESIGN_HOME_IMAGE = U('photo-1560185127-8720d5b717d8');

/** Home page “In-House Showroom” promo block — modest updated kitchen */
export const SHOWROOM_HOME_IMAGE = U('photo-1556911220-bff31c812dba');
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
  guestBath: U('photo-1584622780116-20abe9e21a4b'),
  exterior: SERVICE_CARD_STILLS.exterior,
  basement: SERVICE_CARD_STILLS.basement,
  living: HERO_STILLS.walkthrough,
} as const;

/** Showroom & material showcase — practical finishes in typical homes */
export const SHOWROOM_MATERIAL_IMAGES = {
  countertop: U('photo-1556911220-bff31c812dba'),
  flooring: FLOORING_STILL,
  tile: U('photo-1552321554-5f4fe7a3a0e8'),
  faucet: U('photo-1620626011761-996a0fcc9cee'),
  shower: U('photo-1584622780116-20abe9e21a4b'),
  siding: U('photo-1564013799919-ab6000279886'),
  roofing: U('photo-1513584656210-d57bc65bba22'),
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
