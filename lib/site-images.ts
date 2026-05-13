/**
 * Site-wide imagery: bundled `/manus-storage` hero stills + flooring.
 * Used by service cards, showroom, gallery blocks, service detail pages, and home sections.
 */
const M = '/manus-storage/';

/** Scroll-scrub hero + service marketing stills (JPEG) */
export const HERO_STILLS = {
  /** Front exterior / arrival — matches cinematic hero poster */
  main: `${M}sf-hero-main-poster.jpg`,
  /** Kitchen-forward interior */
  real: `${M}sf-hero-real-poster.jpg`,
  /** Whole-home walkthrough mood */
  walkthrough: `${M}sf-hero-walkthrough-poster.jpg`,
} as const;

const FLOORING_STILL = `${M}surefix-flooring_ffbe994e.jpg`;

/** Home page “In-House Showroom” promo block (dedicated showroom interior still) */
export const SHOWROOM_HOME_IMAGE = `${M}sf-showroom-in-house-section.png`;

/** Service / marketing cards (home, services page, gallery thumbnails) */
export const SITE_IMAGES = {
  kitchen: HERO_STILLS.real,
  bathroom: HERO_STILLS.walkthrough,
  basement: HERO_STILLS.walkthrough,
  exterior: HERO_STILLS.main,
  flooring: FLOORING_STILL,
  additions: HERO_STILLS.real,
  /** Wide interior / walkthrough mood for gallery hero tile */
  galleryHero: HERO_STILLS.walkthrough,
} as const;

/** Showroom & material showcase */
export const SHOWROOM_MATERIAL_IMAGES = {
  countertop: HERO_STILLS.real,
  flooring: FLOORING_STILL,
  tile: HERO_STILLS.walkthrough,
  faucet: HERO_STILLS.real,
  shower: HERO_STILLS.walkthrough,
  siding: HERO_STILLS.main,
  roofing: HERO_STILLS.main,
  lvp: FLOORING_STILL,
} as const;

/** Service page hero headers */
export const SERVICE_HERO = {
  kitchen: HERO_STILLS.real,
  bathroom: HERO_STILLS.walkthrough,
  basement: HERO_STILLS.walkthrough,
  exterior: HERO_STILLS.main,
  additions: HERO_STILLS.real,
  flooring: FLOORING_STILL,
} as const;

/** Default service-detail gallery strip (six tiles) */
export const SERVICE_GALLERY_STILLS: string[] = [
  HERO_STILLS.real,
  HERO_STILLS.walkthrough,
  HERO_STILLS.main,
  FLOORING_STILL,
  HERO_STILLS.walkthrough,
  HERO_STILLS.main,
];

/** Flooring page: lead with product still, then brand interiors */
export const FLOORING_SERVICE_GALLERY: string[] = [
  FLOORING_STILL,
  HERO_STILLS.real,
  HERO_STILLS.walkthrough,
  HERO_STILLS.main,
  FLOORING_STILL,
  HERO_STILLS.walkthrough,
];
