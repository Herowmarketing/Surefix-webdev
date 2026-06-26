/*
 * BlogPost — Sanity-backed article at /blog/:slug
 *
 * Pulls a single post by slug and renders Portable Text via @portabletext/react.
 */
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, AlertTriangle } from 'lucide-react';
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from '@portabletext/react';
import NotFound from './NotFound';
import {
  fetchPost,
  formatPostDate,
  urlFor,
  type PostDetail,
  type SanityImageRef,
} from '@/lib/sanity';
import { useSeo, breadcrumbList, blogPostingSchema, SITE_URL } from '@/lib/seo';

type Props = { params: { slug: string } };

type LoadState =
  | { status: 'loading' }
  | { status: 'ok'; post: PostDetail }
  | { status: 'not-found' }
  | { status: 'error'; message: string };

export default function BlogPost({ params }: Props) {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    fetchPost(params.slug)
      .then((post) => {
        if (cancelled) return;
        if (!post) setState({ status: 'not-found' });
        else setState({ status: 'ok', post });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : 'Failed to load post';
        setState({ status: 'error', message: msg });
      });
    return () => {
      cancelled = true;
    };
  }, [params.slug]);

  if (state.status === 'loading') return <LoadingState />;
  if (state.status === 'not-found') return <NotFound />;
  if (state.status === 'error') return <ErrorState message={state.message} />;

  const { post } = state;
  const dateLabel = formatPostDate(post.publishedAt);
  const heroUrl = urlFor(post.mainImage)?.width(1600).height(900).fit('crop').auto('format').url();
  const ogUrl = urlFor(post.mainImage)?.width(1200).height(630).fit('crop').auto('format').url();
  const plainExcerpt =
    post.body
      ?.flatMap((b) => {
        if (b && typeof b === 'object' && '_type' in b && (b as { _type?: string })._type === 'block') {
          const children = (b as { children?: { text?: string }[] }).children ?? [];
          return children.map((c) => c.text ?? '');
        }
        return [];
      })
      .join(' ')
      .slice(0, 158)
      .trim() ?? '';

  return (
    <BlogPostContent
      post={post}
      params={params}
      heroUrl={heroUrl}
      ogUrl={ogUrl}
      dateLabel={dateLabel}
      plainExcerpt={plainExcerpt}
    />
  );
}

function BlogPostContent({
  post,
  params,
  heroUrl,
  ogUrl,
  dateLabel,
  plainExcerpt,
}: {
  post: PostDetail;
  params: Props['params'];
  heroUrl: string | undefined;
  ogUrl: string | undefined;
  dateLabel: string | null;
  plainExcerpt: string;
}) {
  useSeo({
    title: post.title ?? 'Untitled',
    description: plainExcerpt || `Read “${post.title ?? ''}” on the Sure-Fix Remodeling blog.`,
    path: `/blog/${params.slug}`,
    image: ogUrl,
    imageAlt: post.title ?? 'Sure-Fix Remodeling blog post',
    ogType: 'article',
    article: {
      publishedTime: post.publishedAt ?? undefined,
      author: post.author ?? undefined,
      section: post.categories?.[0],
      tags: post.categories ?? undefined,
    },
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Resources', path: '/resources' },
        { name: post.title ?? 'Article', path: `/blog/${params.slug}` },
      ]),
      blogPostingSchema({
        headline: post.title ?? 'Untitled',
        slug: `/blog/${params.slug}`,
        description: plainExcerpt,
        image: ogUrl,
        datePublished: post.publishedAt ?? undefined,
        author: post.author ?? undefined,
        categories: post.categories ?? undefined,
      }),
    ],
  });

  return (
    <div className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-4 pb-[max(5rem,env(safe-area-inset-bottom,0px)+3rem)] pt-[max(8rem,calc(7rem+env(safe-area-inset-top,0px)))] sm:px-6 lg:px-8">
        <Link href="/resources">
          <span className="mb-6 inline-flex min-h-[44px] cursor-pointer items-center gap-2 py-2 text-sm font-semibold text-[#394696] transition-colors hover:text-slate-900 sm:mb-8">
            <ArrowLeft size={18} aria-hidden /> Back to resources
          </span>
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p
            className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#394696]"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            <BookOpen size={14} className="inline opacity-90" aria-hidden /> Blog
            {dateLabel ? <span className="text-slate-400">· {dateLabel}</span> : null}
            {post.author ? <span className="text-slate-400">· {post.author}</span> : null}
          </p>
          <h1
            className="mb-6 text-3xl font-black leading-snug text-slate-900 sm:mb-8 sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            {post.title ?? 'Untitled'}
          </h1>
        </motion.header>

        {heroUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10 overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
          >
            <img
              src={heroUrl}
              alt={post.title ?? ''}
              className="h-auto w-full object-cover"
              loading="eager"
            />
          </motion.div>
        ) : null}

        <div
          className="space-y-5 text-[1.0625rem] leading-[1.65] text-slate-700 sm:text-lg sm:leading-relaxed"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {post.body && post.body.length > 0 ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="italic text-slate-500">This post has no body content yet.</p>
          )}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <Link href="/resources">
            <span
              className="text-sm font-bold text-[#394696] hover:text-slate-900"
              style={{ fontFamily: 'Figtree, sans-serif' }}
            >
              ← More resources
            </span>
          </Link>
        </div>
      </article>
    </div>
  );
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2
        className="mt-10 text-3xl font-black leading-tight text-slate-900 sm:text-4xl"
        style={{ fontFamily: 'Figtree, sans-serif' }}
      >
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h2
        className="mt-10 text-2xl font-black leading-tight text-slate-900 sm:text-3xl"
        style={{ fontFamily: 'Figtree, sans-serif' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="mt-8 text-xl font-black leading-snug text-slate-900 sm:text-2xl"
        style={{ fontFamily: 'Figtree, sans-serif' }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className="mt-6 text-lg font-bold leading-snug text-slate-900"
        style={{ fontFamily: 'Figtree, sans-serif' }}
      >
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-8 border-l-4 border-[#394696]/60 bg-slate-50 py-3 pl-5 pr-4 text-slate-700 italic"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 marker:text-[#983631]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 marker:text-[#983631]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }: PortableTextMarkComponentProps<{ _type: 'link'; href?: string }>) => {
      const href = value?.href ?? '';
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="font-semibold text-[#394696] underline decoration-[#394696]/40 underline-offset-2 transition-colors hover:text-[#983631] hover:decoration-[#983631]/70"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImageRef & { alt?: string } }) => {
      const src = urlFor(value)?.width(1200).fit('max').auto('format').url();
      if (!src) return null;
      return (
        <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200">
          <img
            src={src}
            alt={value.alt ?? ''}
            loading="lazy"
            className="h-auto w-full object-cover"
          />
        </figure>
      );
    },
  },
};

function LoadingState() {
  return (
    <div className="min-h-screen bg-white">
      <div
        className="mx-auto max-w-3xl px-4 pb-20 pt-[max(8rem,calc(7rem+env(safe-area-inset-top,0px)))] sm:px-6 lg:px-8"
        aria-busy="true"
      >
        <div className="mb-6 h-4 w-32 animate-pulse rounded bg-slate-200" />
        <div className="mb-4 h-10 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="mb-10 aspect-video w-full animate-pulse rounded-2xl bg-slate-100" />
        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-10/12 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-[max(8rem,calc(7rem+env(safe-area-inset-top,0px)))] sm:px-6 lg:px-8">
        <Link href="/resources">
          <span className="mb-6 inline-flex min-h-[44px] cursor-pointer items-center gap-2 py-2 text-sm font-semibold text-[#394696] transition-colors hover:text-slate-900">
            <ArrowLeft size={18} aria-hidden /> Back to resources
          </span>
        </Link>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
          <div className="mb-2 flex items-center gap-2 font-bold">
            <AlertTriangle size={16} aria-hidden /> Couldn’t load this post from Sanity.
          </div>
          <p className="leading-relaxed">
            {message} — confirm the dataset is public and that this origin is on the CORS allowlist
            at{' '}
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
      </div>
    </div>
  );
}
