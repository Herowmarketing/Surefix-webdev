/*
 * RESOURCES — Unified hub for print collateral + every blog post.
 *
 * Blog posts are pulled live from Sanity (so anything published via the CMS —
 * including by our SEO partner — shows up automatically) and merged with the
 * static print pieces and any evergreen on-site articles.
 */
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Newspaper,
  ExternalLink,
  Filter,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'wouter';
import { ALL_PUBLICATIONS, type PublicationKind } from '@/lib/publications-data';
import {
  fetchPosts,
  fetchResourceItems,
  formatPostDate,
  urlFor,
  type PostListItem,
  type ResourceListItem,
} from '@/lib/sanity';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { useSeo, breadcrumbList } from '@/lib/seo';
import { PAGE_SEO } from '@/lib/seo-config';

type FilterKey = 'all' | PublicationKind;

/** Unified card model covering print pieces and blog posts from any source. */
type CardItem = {
  id: string;
  title: string;
  kind: PublicationKind;
  excerpt: string;
  dateLabel: string;
  formatLabel: string;
  href?: string;
  published?: boolean;
  imageUrl?: string | null;
  ctaLabel?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' as const },
  }),
};

const FILTERS: { id: FilterKey; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'blog', label: 'Articles' },
  { id: 'print', label: 'Print Guides' },
  { id: 'featured', label: 'Featured' },
];

/** Map a Sanity post into the unified card model. */
function postToCard(post: PostListItem): CardItem {
  return {
    id: post._id,
    title: post.title ?? 'Untitled',
    kind: 'blog',
    excerpt: post.excerpt ?? '',
    dateLabel: formatPostDate(post.publishedAt) ?? '',
    formatLabel: post.categories?.[0] ?? 'Article',
    href: post.slug ? `/blog/${post.slug}` : undefined,
    published: Boolean(post.slug),
    imageUrl: urlFor(post.mainImage)?.width(800).height(500).fit('crop').auto('format').url() ?? null,
  };
}

/** Map a Sanity-managed print/resource item into the unified card model. */
function resourceToCard(resource: ResourceListItem): CardItem {
  const kind: PublicationKind = resource.kind === 'featured' ? 'featured' : 'print';
  return {
    id: resource._id,
    title: resource.title ?? 'Untitled resource',
    kind,
    excerpt: resource.excerpt ?? '',
    dateLabel: resource.dateLabel ?? '',
    formatLabel: resource.formatLabel ?? (kind === 'featured' ? 'Featured' : 'Print guide'),
    href: resource.fileUrl ?? resource.externalUrl ?? undefined,
    published: true,
    imageUrl: urlFor(resource.image)?.width(800).height(500).fit('crop').auto('format').url() ?? null,
    ctaLabel: resource.ctaLabel ?? (resource.fileUrl ? 'Download PDF' : kind === 'featured' ? 'Read feature' : 'Request a Copy'),
  };
}

function PublicationCard({
  item,
  index,
  onRequestCopy,
}: {
  item: CardItem;
  index: number;
  onRequestCopy: () => void;
}) {
  const isPrint = item.kind === 'print';
  const isFeatured = item.kind === 'featured';
  const href = item.href ?? '';
  const canLink = Boolean(item.published !== false && (isPrint || href));
  const isInternal = href.startsWith('/');
  const isMail = href.startsWith('mailto:');
  const printCta = item.ctaLabel ?? (href ? 'Download PDF' : 'Request a Copy');

  return (
    <motion.article
      layout
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={index}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white shadow-lg shadow-black/20"
      style={{ fontFamily: 'Figtree, sans-serif' }}
    >
      {item.imageUrl ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
              isPrint
                ? 'border border-[#394696]/40 bg-[#394696]/20 text-slate-800'
                : isFeatured
                  ? 'border border-slate-300 bg-slate-100 text-slate-800'
                : 'border border-[#983631]/40 bg-[#983631]/15 text-slate-800'
            }`}
          >
            {isPrint ? (
              <>
                <Newspaper size={11} /> Print
              </>
            ) : isFeatured ? (
              <>
                <Newspaper size={11} /> Featured
              </>
            ) : (
              <>
                <BookOpen size={11} /> Article
              </>
            )}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            {item.formatLabel}
          </span>
          {item.dateLabel ? (
            <span className="ml-auto text-[10px] text-slate-400">{item.dateLabel}</span>
          ) : null}
        </div>

        <h2 className="mb-2 text-lg font-black leading-snug text-slate-900">{item.title}</h2>
        {item.excerpt ? (
          <p
            className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {item.excerpt}
          </p>
        ) : (
          <div className="mb-5 flex-1" />
        )}

        <div className="mt-auto flex flex-col gap-2">
          {!canLink ? (
            <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-500">
              Coming soon
            </span>
          ) : isPrint ? (
            <>
              {href ? (
                <a
                  href={href}
                  target={isMail ? undefined : '_blank'}
                  rel={isMail ? undefined : 'noopener noreferrer'}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-xs font-bold text-slate-900 transition-colors hover:bg-[#394696]/35 active:bg-[#394696]/25"
                >
                  <Mail size={14} /> {printCta}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onRequestCopy}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-xs font-bold text-slate-900 transition-colors hover:bg-[#394696]/35 active:bg-[#394696]/25"
                >
                  <Mail size={14} /> {printCta}
                </button>
              )}
              <p className="text-[10px] leading-snug text-slate-400" style={{ fontFamily: 'Georgia, serif' }}>
                Download available guides instantly, or ask us to mail or email print pieces directly to you.
              </p>
            </>
          ) : isFeatured ? (
            <a
              href={href}
              target={isInternal ? undefined : '_blank'}
              rel={isInternal ? undefined : 'noopener noreferrer'}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-xs font-bold text-slate-900 transition-colors hover:bg-[#394696]/35 active:bg-[#394696]/25"
            >
              {item.ctaLabel ?? 'Read feature'} <ExternalLink size={13} />
            </a>
          ) : isInternal ? (
            <Link href={href}>
              <span className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-xs font-bold text-slate-900 transition-colors hover:bg-[#394696]/35 active:bg-[#394696]/25">
                Read post <ChevronRight size={14} aria-hidden />
              </span>
            </Link>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-xs font-bold text-slate-900 transition-colors hover:bg-[#394696]/35 active:bg-[#394696]/25"
            >
              Read post <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#394696]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.article>
  );
}

export default function Publications() {
  const { openStepper } = useLeadStepper();
  const [filter, setFilter] = useState<FilterKey>('all');
  const [sanityPosts, setSanityPosts] = useState<PostListItem[]>([]);
  const [sanityResources, setSanityResources] = useState<ResourceListItem[]>([]);

  useSeo({
    ...PAGE_SEO.resources,
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Resources', path: '/resources' },
      ]),
    ],
  });

  // Pull live posts/resources from Sanity — anything published via the CMS appears here.
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetchPosts().catch(() => []),
      fetchResourceItems().catch(() => []),
    ])
      .then(([posts, resources]) => {
        if (!cancelled) {
          setSanityPosts(posts);
          setSanityResources(resources);
        }
      })
      .catch(() => {
        // Non-fatal: fall back to static print + on-site content.
        if (!cancelled) {
          setSanityPosts([]);
          setSanityResources([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Merge: live Sanity posts first (newest), then Sanity-managed resources,
  // then evergreen on-site content and fallback print pieces.
  const allCards = useMemo<CardItem[]>(() => {
    const liveSlugs = new Set(sanityPosts.map((p) => p.slug).filter(Boolean));
    const liveResourceTitles = new Set(
      sanityResources.map((r) => r.title?.trim().toLowerCase()).filter(Boolean),
    );
    const staticCards: CardItem[] = ALL_PUBLICATIONS
      // Avoid showing a static placeholder if a live post has the same slug.
      .filter((p) => !(p.href && liveSlugs.has(p.href.split('/').pop() ?? '')))
      // Avoid duplicate print guides once the office creates them in Sanity.
      .filter((p) => p.kind !== 'print' || !liveResourceTitles.has(p.title.trim().toLowerCase()))
      .map((p) => ({ ...p }));
    return [...sanityPosts.map(postToCard), ...sanityResources.map(resourceToCard), ...staticCards];
  }, [sanityPosts, sanityResources]);

  const filtered = useMemo(() => {
    if (filter === 'all') return allCards;
    return allCards.filter((p) => p.kind === filter);
  }, [filter, allCards]);

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-[max(9rem,calc(8rem+env(safe-area-inset-top,0px)))] sm:px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#394696]"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            Resources
          </p>
          <h1
            className="mb-4 text-[1.65rem] font-black leading-[1.12] text-slate-900 sm:mb-5 sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            Resources
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-600 min-[400px]:text-lg" style={{ fontFamily: 'Georgia, serif' }}>
            Remodeling articles, project guidance, printable homeowner guides, and featured Sure-Fix resources
            in one place.
          </p>
        </motion.div>

        <div className="mx-auto mb-8 flex w-full max-w-full justify-center sm:mb-10">
          <div
            className="inline-flex max-w-full snap-x snap-mandatory items-center gap-1 overflow-x-auto rounded-full border border-white/[0.1] bg-slate-50 p-1 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Filter resources"
          >
            <Filter size={14} className="mx-1 shrink-0 text-slate-400 sm:mx-2" aria-hidden />
            {FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={filter === id}
                onClick={() => setFilter(id)}
                className={`min-h-[44px] shrink-0 snap-start rounded-full px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-colors ${
                  filter === id
                    ? 'bg-[#394696] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                style={{ fontFamily: 'Figtree, sans-serif' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item, i) => (
              <PublicationCard key={item.id} item={item} index={i} onRequestCopy={openStepper} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-slate-500" style={{ fontFamily: 'Figtree, sans-serif' }}>
            No items in this category yet.
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#983631]/25 bg-[#983631]/10 px-5 py-7 text-center min-[400px]:p-8 sm:mt-16"
        >
          <h3 className="mb-2 text-xl font-black text-slate-900" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Need a custom packet for your project?
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
            Ask us for physical collateral, or get help choosing the right guide—we&apos;ll tailor recommendations to your
            remodel.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => openStepper()}
              className="min-h-[48px] w-full rounded-xl px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white min-[480px]:w-auto [-webkit-tap-highlight-color:transparent]"
              style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', border: 'none' }}
            >
              Start a conversation
            </button>
            <Link href="/contact">
              <span className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-xl border border-slate-300 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-slate-800 transition-colors hover:bg-slate-50 active:bg-slate-200 min-[480px]:w-auto">
                Contact
              </span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
