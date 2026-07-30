/**
 * PROMOTIONS DATA — Sure-Fix Remodeling 2026 Promotions
 *
 * Edit this file to update standing offers and secondary seasonal positioning.
 * The active kitchen campaign lives in `lib/kitchen-promotion.ts`.
 */

export type PromoCadence = 'year-round' | 'monthly' | 'seasonal' | 'financing';

export type PromoBundle = {
  readonly id: string;
  readonly cadence: PromoCadence;
  readonly tag: string;
  readonly title: string;
  readonly headline: string;
  readonly savings: string;
  readonly bonus?: string;
  readonly bonusValue?: string;
  readonly spotlight?: string;
  readonly positioning: string;
  readonly window?: string;
  readonly accent: 'blue' | 'red';
  readonly icon: string;
};

/** Year-round offers — always on. */
export const YEAR_ROUND_PROMOS: readonly PromoBundle[] = [
  {
    id: 'group-discount',
    cadence: 'year-round',
    tag: 'Targeted Group Discount',
    title: 'Honoring those who serve & those who stay',
    headline: '10% off (up to $2,000)',
    savings: 'For repeat clients, seniors, service members, and first responders.',
    positioning:
      'A standing thank-you to the people whose work and loyalty hold our community together — applied to any qualifying Sure-Fix project, year-round.',
    accent: 'blue',
    icon: '★',
  },
  {
    id: 'referral',
    cadence: 'year-round',
    tag: 'VIP Referral Program',
    title: 'Ask us about our VIP Referral Program',
    headline: 'Direct savings, year-round',
    savings: 'When the homes we\u2019ve transformed introduce us to the next one.',
    positioning:
      'Word of mouth is how Sure-Fix grew. We honor that with a VIP referral structure that pays you back when your recommendation becomes someone else\u2019s renovation.',
    accent: 'red',
    icon: '\u2197',
  },
  {
    id: 'zero-financing',
    cadence: 'year-round',
    tag: '0% Financing',
    title: 'Finance smarter, build better',
    headline: '0% financing for 12 months',
    savings: 'Flexible payment plans built around your project \u2014 not against it.',
    positioning:
      'Twelve months of zero-interest pathways so you can begin the work that matters now, on a schedule that respects your finances.',
    accent: 'red',
    icon: '\u221e',
  },
] as const;
/** Seasonal limited-window bundles — four offers aligned to the calendar. */
export const SEASONAL_BUNDLES: readonly PromoBundle[] = [
  {
    id: 'basement-winter',
    cadence: 'seasonal',
    tag: 'Winter Basement Special',
    title: 'Basement Finishing + Maximize Your ROI Bundle',
    headline: '10% off basement finishing',
    savings: 'Plus our complimentary Maximize Your ROI bundle \u2014 a room-by-room guide to maximizing the return on your finished basement investment.',
    bonus: 'Maximize Your ROI Bundle',
    bonusValue: '$300 value',
    spotlight: 'January \u2013 February',
    window: 'Winter planning season',
    positioning:
      'Unlock hundreds of square feet of livable space during the slowest months of the year \u2014 when scheduling flexibility is at its peak.',
    accent: 'red',
    icon: '\u2736',
  },
  {
    id: 'deck-summer',
    cadence: 'seasonal',
    tag: 'Summer Outdoor Special',
    title: 'Deck & Porch \u2014 Material Durability Bundle',
    headline: '10% off deck or porch projects',
    savings:
      'Plus a Free Structural Integrity Assessment & Material Durability Guide.',
    bonus: 'Structural & Durability Assessment',
    bonusValue: '$400 value',
    spotlight: 'June \u2013 August',
    window: 'Outdoor peak season',
    positioning:
      'Create an outdoor legacy that stands the test of Pennsylvania weather \u2014 expert evaluation plus limited-season savings for summer-ready living.',
    accent: 'blue',
    icon: '\u2600',
  },
  {
    id: 'doors-windows-fall',
    cadence: 'seasonal',
    tag: 'Fall Energy Special',
    title: 'Doors & Windows \u2014 Beat the Bills, Beat the Cold',
    headline: '10% off window & door replacement',
    savings:
      'Plus a Free Custom Energy Performance Assessment for your home.',
    bonus: 'Energy Performance Assessment',
    bonusValue: '$300 value',
    spotlight: 'September \u2013 November',
    window: 'Fall prep & energy savings',
    positioning:
      'Protect comfort, equity, and utility bills before the cold arrives \u2014 professional energy analysis plus exclusive fall project savings.',
    accent: 'red',
    icon: '\u2756',
  },
] as const;
