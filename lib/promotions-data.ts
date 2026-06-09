/**
 * PROMOTIONS DATA — Sure-Fix Remodeling 2026 Promotions
 *
 * Edit this file to update savings bundles, gift-card terms, financing copy,
 * and seasonal positioning. The Promotions page reads everything from here.
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
    id: 'gift-card',
    cadence: 'year-round',
    tag: 'Friends & Family',
    title: '$500 Friends & Family Gift Card',
    headline: 'Toward any future project',
    savings:
      'Present at your first appointment \u2014 apply toward a future Sure-Fix transformation.',
    positioning:
      'A keepsake card that turns goodwill into design budget. Pass it along, frame it, gift it \u2014 and when your loved one is ready to remodel, the savings are waiting.',
    accent: 'blue',
    icon: '\u25c7',
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
    id: 'kitchen-spring',
    cadence: 'seasonal',
    tag: 'Spring Kitchen Special',
    title: 'Kitchen Remodel + Designer Look Guide',
    headline: '10% off your kitchen remodel',
    savings: 'Plus a Free Digital 3D Preview and our Designer Look Kitchens guide \u2014 showing you how to make a $50K kitchen look like a $100K kitchen.',
    bonus: '3D Preview + Designer Look Kitchens Guide',
    bonusValue: '$600 value',
    spotlight: 'March \u2013 May',
    window: 'Spring kitchen refresh season',
    positioning:
      'See your vision in stunning detail before you commit \u2014 exclusive spring savings for decisive homeowners ready to elevate their space.',
    accent: 'blue',
    icon: '\u25cd',
  },
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

/** Gift card legal copy — kept verbatim from the marketing brief. */
export const GIFT_CARD_TERMS = `Savings based on 10% off up to $500. Cannot be combined with any other offers. No cash value. Not applicable on previous or existing contracts. Gift card must be presented at time of first appointment. Other restrictions may apply.`;
