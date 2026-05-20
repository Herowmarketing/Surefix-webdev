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
    tag: 'Referral Program',
    title: 'Ask us about our referral program',
    headline: 'Direct savings, year-round',
    savings: 'When the homes we’ve transformed introduce us to the next one.',
    positioning:
      'Word of mouth is how Sure-Fix grew. We honor that with a referral structure that pays you back when your recommendation becomes someone else’s renovation.',
    accent: 'red',
    icon: '↗',
  },
  {
    id: 'gift-card',
    cadence: 'year-round',
    tag: 'Friends & Family',
    title: '$500 Friends & Family Gift Card',
    headline: 'Toward any future project',
    savings:
      'Present at your first appointment — apply toward a future Sure-Fix transformation.',
    positioning:
      'A keepsake card that turns goodwill into design budget. Pass it along, frame it, gift it — and when your loved one is ready to remodel, the savings are waiting.',
    accent: 'blue',
    icon: '◇',
  },
  {
    id: 'zero-financing',
    cadence: 'year-round',
    tag: '0% Financing',
    title: 'Finance smarter, build better',
    headline: '0% financing for 12 months',
    savings: 'Flexible payment plans built around your project — not against it.',
    positioning:
      'Twelve months of zero-interest pathways so you can begin the work that matters now, on a schedule that respects your finances.',
    accent: 'red',
    icon: '∞',
  },
] as const;

/** Monthly + seasonal limited-window bundles (the promotional engine for 2026). */
export const SEASONAL_BUNDLES: readonly PromoBundle[] = [
  {
    id: 'savings-essentials',
    cadence: 'monthly',
    tag: 'Sure-Fix Savings Essentials',
    title: 'Kitchen Remodel + Digital 3D Preview',
    headline: '10% off your kitchen remodel',
    savings: 'Plus a Free Digital 3D Preview of your project.',
    bonus: 'Free Digital 3D Preview',
    bonusValue: '$350 value',
    spotlight: 'March – May',
    window: 'Kitchen refresh season',
    positioning:
      'See your vision in stunning detail before you commit — exclusive summer savings for decisive homeowners ready to elevate their space.',
    accent: 'blue',
    icon: '◍',
  },
  {
    id: 'everyday-value',
    cadence: 'monthly',
    tag: 'Unlock Everyday Value',
    title: '10% off ANY project + designer kitchen guide',
    headline: 'Up to $2,000 off for qualifying groups',
    savings:
      'Plus a complimentary guide: How to make a $50K kitchen look like a $100K kitchen.',
    bonus: 'Designer-look kitchen guide',
    bonusValue: '$250 value',
    spotlight: 'January – February',
    window: 'Indoor & outdoor planning',
    positioning:
      'We reward those who trust us long-term and serve our community — meaningful savings reserved for the summer season when indoor and outdoor work is at its smartest.',
    accent: 'red',
    icon: '✦',
  },
  {
    id: 'deck-durability',
    cadence: 'seasonal',
    tag: 'Seasonal Services Carousel',
    title: 'Deck & Porch — Material Durability Bundle',
    headline: '10% off deck or porch projects (up to $2,000)',
    savings:
      'Plus a Free Structural Integrity Assessment & Material Durability Guide.',
    bonus: 'Structural & Durability Assessment',
    bonusValue: '$400 value',
    spotlight: 'June – August',
    window: 'Outdoor peak season',
    positioning:
      'Create an outdoor legacy that stands the test of Pennsylvania weather — expert evaluation plus limited-season savings for summer-ready living.',
    accent: 'blue',
    icon: '☼',
  },
  {
    id: 'energy-doors-windows',
    cadence: 'seasonal',
    tag: 'Seasonal Services Infographic',
    title: 'Doors & Windows — Beat the bills, beat the cold',
    headline: '10% off window & door replacement (up to $2,000)',
    savings:
      'Plus a Free Custom Energy Performance Assessment for your home.',
    bonus: 'Energy Performance Assessment',
    bonusValue: '$300 value',
    spotlight: 'September – November',
    window: 'Fall prep & energy savings',
    positioning:
      'Protect comfort, equity, and utility bills before the cold arrives — professional energy analysis plus exclusive fall project savings.',
    accent: 'red',
    icon: '❖',
  },
  {
    id: 'financing-pinned',
    cadence: 'financing',
    tag: '0% Financing Details · Pinned',
    title: 'Finance Smarter, Build Better',
    headline: '0% Financing Approval Pathways Explained',
    savings:
      'Plus a Free In-Home Layout Assessment Consultation.',
    bonus: 'In-Home Layout Consultation',
    bonusValue: '$275 value',
    spotlight: 'September – November',
    window: 'Fall prep',
    positioning:
      'A clear, jargon-free walkthrough of how 0% financing works — paired with a designer in your home to map the layout before you spend a dollar.',
    accent: 'blue',
    icon: '◎',
  },
  {
    id: 'financing-carousel',
    cadence: 'financing',
    tag: '0% Financing Details · Carousel',
    title: 'No-Interest Pathways Explained',
    headline: '0% financing + Smart Home Compatibility Assessment',
    savings:
      'See if your project is ready for integrated lighting, climate, and security from day one.',
    bonus: 'Smart Home Compatibility Assessment',
    bonusValue: '$350 value',
    spotlight: 'March – May',
    window: 'Early-year demand',
    positioning:
      'A planning bundle for homeowners thinking ahead — finance the build, future-proof the tech, and arrive at move-in day with nothing left to retrofit.',
    accent: 'red',
    icon: '◈',
  },
] as const;

/** Gift card legal copy — kept verbatim from the marketing brief. */
export const GIFT_CARD_TERMS = `Savings based on 10% off up to $500. Cannot be combined with any other offers. No cash value. Not applicable on previous or existing contracts. Gift card must be presented at time of first appointment. Other restrictions may apply.`;
