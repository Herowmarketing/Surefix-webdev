/**
 * Publications & blog listings — blog slugs match lib/blog-content.ts
 */

import { BUSINESS } from '@/lib/constants';

export type PublicationKind = 'print' | 'blog';

export type PublicationItem = {
  readonly id: string;
  readonly title: string;
  readonly kind: PublicationKind;
  readonly excerpt: string;
  readonly dateLabel: string;
  /** mailto:, http(s), or internal path /publications/blog/:slug */
  readonly href?: string;
  readonly formatLabel: string;
  /** If false, card shows “coming soon” instead of CTA */
  readonly published?: boolean;
};

function printRequestSubject(title: string): string {
  return `Request print materials: ${title}`;
}

/** Print: request-by-email until PDFs are hosted — each card is actionable */
export const PRINT_PUBLICATIONS: readonly PublicationItem[] = [
  {
    id: 'print-1',
    title: 'Lehigh Valley Home Remodeling Guide',
    kind: 'print',
    excerpt:
      'Room-by-room planning checklist, financing overview, and what to ask before you sign—built for homeowners comparing remodelers.',
    dateLabel: '2026',
    formatLabel: 'Print brochure',
    href: `mailto:${BUSINESS.email}?subject=${encodeURIComponent(printRequestSubject('Lehigh Valley Home Remodeling Guide'))}`,
    published: true,
  },
  {
    id: 'print-2',
    title: 'Kitchen & Bath Idea Book',
    kind: 'print',
    excerpt:
      'Material pairings, cabinet styles, and before/after highlights from recent Sure-Fix projects across the Valley.',
    dateLabel: '2026',
    formatLabel: 'Lookbook',
    href: `mailto:${BUSINESS.email}?subject=${encodeURIComponent(printRequestSubject('Kitchen & Bath Idea Book'))}`,
    published: true,
  },
  {
    id: 'print-3',
    title: 'Home Show Quick Sheet',
    kind: 'print',
    excerpt:
      'One-page reference we hand out at regional home shows: timelines, warranty highlights, and how to reach our team.',
    dateLabel: 'Seasonal',
    formatLabel: 'Event handout',
    href: `mailto:${BUSINESS.email}?subject=${encodeURIComponent(printRequestSubject('Home Show Quick Sheet'))}`,
    published: true,
  },
];

/** Online blog — full articles on-site */
export const BLOG_POSTS: readonly PublicationItem[] = [
  {
    id: 'blog-1',
    title: 'When a Repair Turns Into a Full Remodel',
    kind: 'blog',
    excerpt:
      'Structural surprises, code updates, and how we scope changes without blowing the timeline.',
    dateLabel: 'May 2026',
    formatLabel: 'Article',
    href: '/publications/blog/when-repair-turns-remodel',
    published: true,
  },
  {
    id: 'blog-2',
    title: 'Choosing Cabinets: Stock, Semi-Custom, or Custom',
    kind: 'blog',
    excerpt:
      'A practical breakdown for busy homeowners—where money goes and what lasts longest in real kitchens.',
    dateLabel: 'May 2026',
    formatLabel: 'Guide',
    href: '/publications/blog/choosing-cabinets-stock-semi-custom-custom',
    published: true,
  },
  {
    id: 'blog-3',
    title: 'Basement Moisture & Finishing: What to Fix First',
    kind: 'blog',
    excerpt:
      'Why we inspect drainage and framing before drywall—and how it protects your investment.',
    dateLabel: 'May 2026',
    formatLabel: 'How-to',
    href: '/publications/blog/basement-moisture-finishing-first-steps',
    published: true,
  },
];

export const ALL_PUBLICATIONS: readonly PublicationItem[] = [...PRINT_PUBLICATIONS, ...BLOG_POSTS];
