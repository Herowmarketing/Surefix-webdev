/*
 * PUBLICATIONS — Print collateral + online blog hub
 */
import { useMemo, useState } from 'react';
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
import { ALL_PUBLICATIONS, type PublicationItem, type PublicationKind } from '@/lib/publications-data';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { useSeo, breadcrumbList } from '@/lib/seo';
import { PAGE_SEO } from '@/lib/seo-config';

type FilterKey = 'all' | PublicationKind;

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
  { id: 'print', label: 'Print' },
  { id: 'blog', label: 'Blog' },
];

function PublicationCard({ item, index }: { item: PublicationItem; index: number }) {
  const isPrint = item.kind === 'print';
  const canLink = Boolean(item.href && item.published !== false);
  const href = item.href ?? '';
  const isInternal = href.startsWith('/');
  const isMailto = href.startsWith('mailto:');

  return (
    <motion.article
      layout
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={index}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 shadow-lg shadow-black/20 sm:p-5"
      style={{ fontFamily: 'Figtree, sans-serif' }}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
            isPrint
              ? 'border border-[#394696]/40 bg-[#394696]/20 text-slate-800'
              : 'border border-[#983631]/40 bg-[#983631]/15 text-slate-800'
          }`}
        >
          {isPrint ? (
            <>
              <Newspaper size={11} /> Print
            </>
          ) : (
            <>
              <BookOpen size={11} /> Blog
            </>
          )}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          {item.formatLabel}
        </span>
        <span className="ml-auto text-[10px] text-slate-400">{item.dateLabel}</span>
      </div>

      <h2 className="mb-2 text-lg font-black leading-snug text-white">{item.title}</h2>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
        {item.excerpt}
      </p>

      <div className="mt-auto flex items-center gap-2">
        {canLink ? (
          isInternal ? (
            <Link href={href}>
              <span className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-xs font-bold text-slate-900 transition-colors hover:bg-[#394696]/35 active:bg-[#394696]/25">
                Read post <ChevronRight size={14} aria-hidden />
              </span>
            </Link>
          ) : (
            <a
              href={href}
              {...(isMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-xs font-bold text-slate-900 transition-colors hover:bg-[#394696]/35 active:bg-[#394696]/25"
            >
              {isPrint ? (
                <>
                  <Mail size={14} /> Request copy
                </>
              ) : (
                <>
                  Read post <ExternalLink size={13} />
                </>
              )}
            </a>
          )
        ) : (
          <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-500">
            Coming soon
          </span>
        )}
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

  useSeo({
    ...PAGE_SEO.publications,
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Publications', path: '/publications' },
      ]),
    ],
  });

  const filtered = useMemo(() => {
    if (filter === 'all') return ALL_PUBLICATIONS;
    return ALL_PUBLICATIONS.filter((p) => p.kind === filter);
  }, [filter]);

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
            className="mb-4 text-[1.65rem] font-black leading-[1.12] text-white sm:mb-5 sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            Publications &amp; Blog
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-600 min-[400px]:text-lg" style={{ fontFamily: 'Georgia, serif' }}>
            Browse Sure-Fix print pieces we distribute at home shows and in the community, plus articles from our
            online blog—remodeling tips, project stories, and homeowner guides.
          </p>
        </motion.div>

        <div className="mx-auto mb-8 flex w-full max-w-full justify-center sm:mb-10">
          <div
            className="inline-flex max-w-full snap-x snap-mandatory items-center gap-1 overflow-x-auto rounded-full border border-white/[0.1] bg-slate-50 p-1 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Filter publications"
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
              <PublicationCard key={item.id} item={item} index={i} />
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
            Ask us for physical collateral, or subscribe to new blog posts—we&apos;ll tailor recommendations to your
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
