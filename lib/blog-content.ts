/**
 * Full text for /publications/blog/:slug — edit here as you publish.
 */

export type BlogPostContent = {
  readonly title: string;
  readonly dateLabel: string;
  readonly formatLabel: string;
  readonly paragraphs: readonly string[];
};

export const BLOG_POSTS_BY_SLUG: Record<string, BlogPostContent> = {
  'when-repair-turns-remodel': {
    title: 'When a Repair Turns Into a Full Remodel',
    dateLabel: 'May 2026',
    formatLabel: 'Article',
    paragraphs: [
      'Homeowners often call us for a single issue—a leak at the sill, a soft spot in the subfloor, or a window that won’t seal. On site, we sometimes find layered wear: water found a path over years, insulation is under-spec, or framing was never tied to code current when the house was built.',
      'When that happens, “small repair” estimates turn into honest conversations about scope. We document what we see, separate must-fix safety and structure from wish-list finishes, and give you phases so you can choose what happens now versus later.',
      'Our goal is to keep surprises predictable: fewer change orders from hidden conditions because we looked at drainage, structure, and mechanical routing before locking in tile or cabinetry.',
    ],
  },
  'choosing-cabinets-stock-semi-custom-custom': {
    title: 'Choosing Cabinets: Stock, Semi-Custom, or Custom',
    dateLabel: 'May 2026',
    formatLabel: 'Guide',
    paragraphs: [
      'Cabinet spend is one of the loudest lines in a kitchen proposal. Stock boxes land fast and keep budgets tight; semi-custom buys you wider sizes, better interior options, and finishes that feel tailored; custom is for irregular rooms, inset doors, or details you can’t get from a catalog.',
      'We walk clients through how they actually cook and store: tray zones, tall pantries, appliance garages, and landing space next to refrigeration. That drives box depths and heights more than door style alone.',
      'If you plan to stay in the home, we bias durability—hinges, drawer systems, and finishes that survive steam and daily use. If you’re preparing to sell, we balance impact per dollar so the kitchen reads crisp without overbuilding for the block.',
    ],
  },
  'basement-moisture-finishing-first-steps': {
    title: 'Basement Moisture & Finishing: What to Fix First',
    dateLabel: 'May 2026',
    formatLabel: 'How-to',
    paragraphs: [
      'A finished basement fails loudly when water finds a new path—swelling base trim, musty carpet, or panel seams telegraphing damp. Before insulation and drywall, we want a clear story on where water has been and where it’s routed now.',
      'Grading, gutters, and downspout discharge matter as much as interior sealers. If the rim joist or slab edge has history of seepage, we address drainage and air sealing before trapping moisture behind walls.',
      'Once control layers make sense, we plan finishes that tolerate occasional humidity: appropriate insulation assemblies, mechanicals that don’t fight conditioned air, and materials that won’t feed mold if something changes seasonally.',
    ],
  },
};

export function getBlogPost(slug: string): BlogPostContent | undefined {
  return BLOG_POSTS_BY_SLUG[slug];
}
