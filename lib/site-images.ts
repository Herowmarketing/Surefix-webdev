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

/** Stock stills for service cards + heroes (Unsplash — same pattern as `TEAM` in constants) */
const U = (path: string) =>
  `https://images.unsplash.com/${path}?w=1200&q=80&auto=format&fit=crop` as const;

const SERVICE_CARD_STILLS = {
  kitchen: U('photo-1686023858216-4f54c853acf2'),
  bathroom: U('photo-1638799869566-b17fa794c4de'),
  basement: U('photo-1778731660267-3dad0ce72315'),
  exterior: U('photo-1769016760743-eb89fdfdd32e'),
  additions: U('photo-1759412393800-0ac06909423a'),
} as const;

/** Home page “In-House Design Partner” block — luxury whole-home interior layout */
export const INTERIOR_DESIGN_HOME_IMAGE = U('photo-1618221195710-dd6b41faaea6');

/** Home page “In-House Showroom” promo block — poster while video loads */
export const SHOWROOM_HOME_IMAGE = `${M}sf-showroom-in-house-section.png`;
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
  siding: SERVICE_CARD_STILLS.exterior,
  roofing: HERO_STILLS.main,
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
