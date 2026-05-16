/**
 * Site navigation entries — editable single source for desktop dropdown + mobile overlay.
 *
 * To nest routes under any top-level item: replace `{ href }` with `{ children: [...] }`
 * and list each destination (always include an “overview” row if there is a main page).
 */

export type PrimaryNavChild = {
  readonly label: string;
  readonly href: string;
  readonly icon?: string;
};

export type PrimaryNavEntry =
  | {
      readonly id: string;
      readonly label: string;
      readonly href: string;
    }
  | {
      readonly id: string;
      readonly label: string;
      readonly children: readonly PrimaryNavChild[];
    };

export type ServiceNavSlice = ReadonlyArray<{
  id: string;
  title: string;
  slug: string;
  icon: string;
}>;

/** Type guard — expandable sections expose children instead of inline dests. */
export function hasNavChildren(
  entry: PrimaryNavEntry
): entry is { id: string; label: string; children: readonly PrimaryNavChild[] } {
  return 'children' in entry && Array.isArray((entry as { children?: unknown }).children);
}

export function buildPrimaryNav(services: ServiceNavSlice): PrimaryNavEntry[] {
  return [
    { id: 'home', label: 'Home', href: '/' },
    {
      id: 'services',
      label: 'Services',
      children: [
        { label: 'Overview', href: '/services', icon: '◇' },
        ...services.map((s) => ({
          label: s.title,
          href: s.slug,
          icon: s.icon,
        })),
      ],
    },
    { id: 'showroom', label: 'Showroom', href: '/showroom' },
    { id: 'design', label: 'Design', href: '/interior-design' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ];
}
