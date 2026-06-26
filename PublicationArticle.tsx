/*
 * Static fallback article — /publications/blog/:slug
 */
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import NotFound from './NotFound';
import { getBlogPost } from '@/lib/blog-content';
import { useSeo, breadcrumbList, blogPostingSchema } from '@/lib/seo';

type Props = { params: { slug: string } };

export default function PublicationArticle({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) return <NotFound />;

  const excerpt = (post.paragraphs?.[0] ?? '').slice(0, 158);

  useSeo({
    title: post.title,
    description: excerpt,
    path: `/publications/blog/${params.slug}`,
    imageAlt: post.title,
    ogType: 'article',
    article: {
      section: post.formatLabel,
    },
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Resources', path: '/resources' },
        { name: post.title, path: `/publications/blog/${params.slug}` },
      ]),
      blogPostingSchema({
        headline: post.title,
        slug: `/publications/blog/${params.slug}`,
        description: excerpt,
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
            <BookOpen size={14} className="inline opacity-90" /> Blog · {post.formatLabel}
            <span className="text-slate-400">· {post.dateLabel}</span>
          </p>
          <h1
            className="mb-6 text-[1.5rem] font-black leading-snug text-white sm:mb-8 sm:text-3xl md:text-4xl"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            {post.title}
          </h1>
        </motion.header>

        <div
          className="space-y-5 text-[1.0625rem] leading-[1.65] text-slate-700 sm:text-lg sm:leading-relaxed"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {post.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <Link href="/resources">
            <span className="text-sm font-bold text-[#394696] hover:text-slate-900" style={{ fontFamily: 'Figtree, sans-serif' }}>
              ← More resources
            </span>
          </Link>
        </div>
      </article>
    </div>
  );
}
