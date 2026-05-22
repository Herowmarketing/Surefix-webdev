/*
 * BlogList — Sanity-backed blog index at /blog
 *
 * GROQ powered (see lib/sanity.ts), portable-text excerpt, light theme matches Publications.
 */
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, AlertTriangle } from 'lucide-react';
import { fetchPosts, formatPostDate, urlFor, type PostListItem } from '@/lib/sanity';
import { useSeo, breadcrumbList, SITE_URL } from '@/lib/seo';
import { PAGE_SEO } from '@/lib/seo-config';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' as const },
  }),
};

export default function BlogList() {
  const [posts, setPosts] = useState<PostListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useSeo({
    ...PAGE_SEO.blog,
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog`,
        name: 'Sure-Fix Remodeling Blog',
        description:
          'Practical remodeling guidance from Sure-Fix Remodeling — kitchen, bathroom, basement, exterior and aging-in-place projects.',
        publisher: { '@id': 'https://surefixremodelinglv.com/#organization' },
      },
      ...(posts ?? []).slice(0, 10).map((p) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title ?? 'Untitled',
        description: p.excerpt ?? '',
        datePublished: p.publishedAt ?? undefined,
        author: p.author ? { '@type': 'Person', name: p.author } : undefined,
        url: p.slug ? `${SITE_URL}/blog/${p.slug}` : undefined,
        image: urlFor(p.mainImage)?.width(1200).height(630).url(),
        mainEntityOfPage: p.slug ? `${SITE_URL}/blog/${p.slug}` : undefined,
      })),
    ],
  });

  useEffect(() => {
    let cancelled = false;
    fetchPosts()
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : 'Failed to load posts';
        setError(msg);
        setPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-[max(8rem,calc(7rem+env(safe-area-inset-top,0px)))] sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 max-w-3xl"
        >
          <p
            className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#394696]"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            <BookOpen size={14} aria-hidden /> Blog
          </p>
          <h1
            className="mb-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            Notes from the field.
          </h1>
          <p
            className="text-base leading-relaxed text-slate-600 sm:text-lg"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Practical remodeling guidance from the Sure-Fix team — written for homeowners thinking
            about kitchens, baths, additions, and aging-in-place upgrades.
          </p>
        </motion.header>

        {error ? <ErrorState message={error} /> : null}
        {!error && posts === null ? <LoadingState /> : null}
        {!error && posts !== null && posts.length === 0 ? <EmptyState /> : null}

        {posts && posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post._id} post={post} index={i} />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

function PostCard({ post, index }: { post: PostListItem; index: number }) {
  const href = post.slug ? `/blog/${post.slug}` : null;
  const imageUrl = urlFor(post.mainImage)?.width(800).height(500).fit('crop').auto('format').url();
  const dateLabel = formatPostDate(post.publishedAt);

  return (
    <motion.article
      layout
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={index}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
      style={{ fontFamily: 'Figtree, sans-serif' }}
    >
      {imageUrl ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <img
            src={imageUrl}
            alt={post.title ?? ''}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
          <BookOpen size={32} aria-hidden />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {(post.categories?.length ?? 0) > 0 || dateLabel ? (
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {(post.categories ?? []).map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-[#394696]/30 bg-[#394696]/10 px-2.5 py-0.5 text-[#394696]"
              >
                {cat}
              </span>
            ))}
            {dateLabel ? <span className="ml-auto text-slate-400">{dateLabel}</span> : null}
          </div>
        ) : null}

        <h2 className="mb-2 text-lg font-black leading-snug text-slate-900">
          {post.title ?? 'Untitled'}
        </h2>

        {post.excerpt ? (
          <p
            className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {post.excerpt}
          </p>
        ) : (
          <div className="mb-5 flex-1" />
        )}

        <div className="mt-auto flex items-center justify-between">
          {post.author ? (
            <span className="text-xs font-semibold text-slate-500">by {post.author}</span>
          ) : (
            <span />
          )}
          {href ? (
            <Link href={href}>
              <span className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-xs font-bold text-slate-900 transition-colors hover:bg-[#394696]/20">
                Read post <ChevronRight size={14} aria-hidden />
              </span>
            </Link>
          ) : (
            <span className="text-xs font-semibold text-slate-400">Draft</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div className="aspect-[16/10] w-full animate-pulse bg-slate-100" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
      <BookOpen size={28} className="mx-auto mb-3 text-slate-400" aria-hidden />
      <p
        className="text-base font-semibold text-slate-700"
        style={{ fontFamily: 'Figtree, sans-serif' }}
      >
        No posts published yet.
      </p>
      <p className="mt-1 text-sm text-slate-500" style={{ fontFamily: 'Georgia, serif' }}>
        New articles will appear here once the Sure-Fix team publishes them.
      </p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
      <div className="mb-2 flex items-center gap-2 font-bold">
        <AlertTriangle size={16} aria-hidden /> Couldn’t load posts from Sanity.
      </div>
      <p className="leading-relaxed">
        {message} — confirm the dataset is public and that{' '}
        <code className="rounded bg-red-100 px-1 py-0.5">http://localhost:5173</code> is on the
        CORS allowlist at{' '}
        <a
          href="https://www.sanity.io/manage/project/kqp67u17/api"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          sanity.io/manage
        </a>
        .
      </p>
    </div>
  );
}
