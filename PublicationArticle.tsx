/*
 * Blog article — /publications/blog/:slug
 */
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import NotFound from './NotFound';
import { getBlogPost } from '@/lib/blog-content';

type Props = { params: { slug: string } };

export default function PublicationArticle({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) return <NotFound />;

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <article className="mx-auto max-w-3xl px-5 pb-20 pt-32 lg:px-8">
        <Link href="/publications">
          <span className="mb-8 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#394696] transition-colors hover:text-white">
            <ArrowLeft size={16} /> Back to publications
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
            <span className="text-white/35">· {post.dateLabel}</span>
          </p>
          <h1
            className="mb-8 text-3xl font-black leading-tight text-white md:text-4xl"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            {post.title}
          </h1>
        </motion.header>

        <div className="space-y-5 text-base leading-relaxed text-white/70" style={{ fontFamily: 'Georgia, serif' }}>
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

        <div className="mt-12 border-t border-white/10 pt-8">
          <Link href="/publications">
            <span className="text-sm font-bold text-[#394696] hover:text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>
              ← More articles & print pieces
            </span>
          </Link>
        </div>
      </article>
    </div>
  );
}
