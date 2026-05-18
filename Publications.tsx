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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-lg shadow-black/20"
      style={{ fontFamily: 'Figtree, sans-serif' }}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
            isPrint
              ? 'border border-[#394696]/40 bg-[#394696]/20 text-white/90'
              : 'border border-[#983631]/40 bg-[#983631]/15 text-white/90'
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
        <span className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
          {item.formatLabel}
        </span>
        <span className="ml-auto text-[10px] text-white/35">{item.dateLabel}</span>
      </div>

      <h2 className="mb-2 text-lg font-black leading-snug text-white">{item.title}</h2>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-white/55" style={{ fontFamily: 'Georgia, serif' }}>
        {item.excerpt}
      </p>

      <div className="mt-auto flex items-center gap-2">
        {canLink ? (
          isInternal ? (
            <Link href={href}>
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white/[0.08] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#394696]/35">
                Read post <ChevronRight size={14} />
              </span>
            </Link>
          ) : (
            <a
              href={href}
              {...(isMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className="inline-flex items-center gap-2 rounded-lg bg-white/[0.08] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#394696]/35"
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
          <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/15 px-3 py-2 text-xs font-semibold text-white/40">
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

  const filtered = useMemo(() => {
    if (filter === 'all') return ALL_PUBLICATIONS;
    return ALL_PUBLICATIONS.filter((p) => p.kind === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 lg:px-8">
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
            className="mb-5 text-4xl font-black text-white md:text-5xl"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            Publications &amp; Blog
          </h1>
          <p className="text-lg leading-relaxed text-white/60" style={{ fontFamily: 'Georgia, serif' }}>
            Browse Sure-Fix print pieces we distribute at home shows and in the community, plus articles from our
            online blog—remodeling tips, project stories, and homeowner guides.
          </p>
        </motion.div>

        <div className="mx-auto mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] p-1"
            role="tablist"
            aria-label="Filter publications"
          >
            <Filter size={14} className="ml-2 text-white/35 sm:ml-3" aria-hidden />
            {FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={filter === id}
                onClick={() => setFilter(id)}
                className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors ${
                  filter === id
                    ? 'bg-[#394696] text-white'
                    : 'text-white/55 hover:text-white'
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
          <p className="py-12 text-center text-white/45" style={{ fontFamily: 'Figtree, sans-serif' }}>
            No items in this category yet.
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-16 max-w-2xl rounded-2xl border border-[#983631]/25 bg-[#983631]/10 p-8 text-center"
        >
          <h3 className="mb-2 text-xl font-black text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Need a custom packet for your project?
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-white/65" style={{ fontFamily: 'Georgia, serif' }}>
            Ask us for physical collateral, or subscribe to new blog posts—we&apos;ll tailor recommendations to your
            remodel.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => openStepper()}
              className="rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider text-white"
              style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', border: 'none' }}
            >
              Start a conversation
            </button>
            <Link href="/contact">
              <span className="inline-flex cursor-pointer items-center rounded-xl border border-white/15 px-6 py-3 text-xs font-black uppercase tracking-wider text-white/85 transition-colors hover:bg-white/[0.06]">
                Contact
              </span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
