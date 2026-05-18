/**
 * Publications & blog listings — swap placeholders for real assets / URLs as you publish.
 */

export type PublicationKind = 'print' | 'blog';

export type PublicationItem = {
  readonly id: string;
  readonly title: string;
  readonly kind: PublicationKind;
  /** Short description for cards */
  readonly excerpt: string;
  /** Display date */
  readonly dateLabel: string;
  /** Optional link — PDF, Issuu, article URL, etc. */
  readonly href?: string;
  /** e.g. "Direct mail", "Magazine", "How-to" */
  readonly formatLabel: string;
  /** If false, card shows “coming soon” instead of CTA */
  readonly published?: boolean;
};

/** Print: mailers, show guides, local ads, inserts — link to PDF or reader when ready */
export const PRINT_PUBLICATIONS: readonly PublicationItem[] = [
  {
    id: 'print-1',
    title: 'Lehigh Valley Home Remodeling Guide',
    kind: 'print',
    excerpt:
      'Room-by-room planning checklist, financing overview, and what to ask before you sign—built for homeowners comparing remodelers.',
    dateLabel: '2026',
    formatLabel: 'Print brochure',
    published: false,
  },
  {
    id: 'print-2',
    title: 'Kitchen & Bath Idea Book',
    kind: 'print',
    excerpt:
      'Material pairings, cabinet styles, and before/after highlights from recent Sure-Fix projects across the Valley.',
    dateLabel: '2026',
    formatLabel: 'Lookbook',
    published: false,
  },
  {
    id: 'print-3',
    title: 'Home Show Quick Sheet',
    kind: 'print',
    excerpt:
      'One-page reference we hand out at regional home shows: timelines, warranty highlights, and how to reach our team.',
    dateLabel: 'Seasonal',
    formatLabel: 'Event handout',
    published: false,
  },
];

/** Online blog posts — point href at CMS, Substack, Medium, or your own /blog/slug later */
export const BLOG_POSTS: readonly PublicationItem[] = [
  {
    id: 'blog-1',
    title: 'When a Repair Turns Into a Full Remodel',
    kind: 'blog',
    excerpt:
      'Structural surprises, code updates, and how we scope changes without blowing the timeline.',
    dateLabel: 'Coming soon',
    formatLabel: 'Article',
    published: false,
  },
  {
    id: 'blog-2',
    title: 'Choosing Cabinets: Stock, Semi-Custom, or Custom',
    kind: 'blog',
    excerpt:
      'A practical breakdown for busy homeowners—where money goes and what lasts longest in real kitchens.',
    dateLabel: 'Coming soon',
    formatLabel: 'Guide',
    published: false,
  },
  {
    id: 'blog-3',
    title: 'Basement Moisture & Finishing: What to Fix First',
    kind: 'blog',
    excerpt:
      'Why we inspect drainage and framing before drywall—and how it protects your investment.',
    dateLabel: 'Coming soon',
    formatLabel: 'How-to',
    published: false,
  },
];

export const ALL_PUBLICATIONS: readonly PublicationItem[] = [...PRINT_PUBLICATIONS, ...BLOG_POSTS];
