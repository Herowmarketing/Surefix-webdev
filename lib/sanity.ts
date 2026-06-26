/**
 * Sanity client + helpers for the public Sure-Fix blog.
 *
 * Project: kqp67u17 · Dataset: production · Schema: studio-sure-fix-remodeling/
 *
 * Add `http://localhost:5173` and the production origin to CORS at:
 *   https://www.sanity.io/manage/project/kqp67u17/api
 */
import { createClient, type SanityClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/react';

type ImageUrlBuilder = ReturnType<ReturnType<typeof createImageUrlBuilder>['image']>;

export const sanityClient: SanityClient = createClient({
  projectId: 'kqp67u17',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

/** Build a CDN URL from a Sanity image reference (preserves hotspot/crop). */
export function urlFor(source: SanityImageRef | null | undefined): ImageUrlBuilder | null {
  if (!source?.asset?._ref) return null;
  return builder.image(source);
}

export type SanityImageRef = {
  asset: { _ref: string; _type: 'reference' };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type PostListItem = {
  _id: string;
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  mainImage: SanityImageRef | null;
  author: string | null;
  categories: string[] | null;
  excerpt: string | null;
};

export type PostDetail = {
  _id: string;
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  mainImage: SanityImageRef | null;
  body: PortableTextBlock[] | null;
  author: string | null;
  categories: string[] | null;
};

export type ResourceListItem = {
  _id: string;
  title: string | null;
  slug: string | null;
  kind: string | null;
  excerpt: string | null;
  dateLabel: string | null;
  formatLabel: string | null;
  image: SanityImageRef | null;
  fileUrl: string | null;
  externalUrl: string | null;
  ctaLabel: string | null;
};

const BLOG_TYPES = ['post', 'blogPost', 'article'];

const POST_LIST_QUERY = `*[_type in $types && defined(slug.current)] | order(coalesce(publishedAt, date, _createdAt) desc) {
  _id,
  "title": coalesce(title, headline),
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, date, _createdAt),
  "mainImage": coalesce(mainImage, image, coverImage),
  "author": coalesce(author->name, author.name, author),
  "categories": coalesce(categories[]->title, categories[], []),
  "excerpt": coalesce(excerpt, description, pt::text(body[0]), pt::text(content[0]))
}`;

const POST_DETAIL_QUERY = `*[_type in $types && slug.current == $slug][0] {
  _id,
  "title": coalesce(title, headline),
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, date, _createdAt),
  "mainImage": coalesce(mainImage, image, coverImage),
  "body": coalesce(body, content),
  "author": coalesce(author->name, author.name, author),
  "categories": coalesce(categories[]->title, categories[], [])
}`;

const RESOURCE_LIST_QUERY = `*[_type == "resourceItem" && isPublished == true] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  "slug": slug.current,
  kind,
  excerpt,
  dateLabel,
  formatLabel,
  image,
  "fileUrl": file.asset->url,
  externalUrl,
  ctaLabel
}`;

export function fetchPosts(): Promise<PostListItem[]> {
  return sanityClient.fetch<PostListItem[]>(POST_LIST_QUERY, { types: BLOG_TYPES });
}

export function fetchPost(slug: string): Promise<PostDetail | null> {
  return sanityClient.fetch<PostDetail | null>(POST_DETAIL_QUERY, { slug, types: BLOG_TYPES });
}

export function fetchResourceItems(): Promise<ResourceListItem[]> {
  return sanityClient.fetch<ResourceListItem[]>(RESOURCE_LIST_QUERY);
}

/** Format an ISO date as e.g. "May 22, 2026". Returns null for missing input. */
export function formatPostDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
