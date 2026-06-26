# Adaptify Sanity Publishing Checklist

Use this checklist for any SEO partner publishing blogs to the Sure-Fix Remodeling website.

## Required Sanity Destination

- Project ID: `kqp67u17`
- Dataset: `production`
- Primary document type: `post`
- Also supported by the website: `blogPost`, `article`

The live site currently reads public, published Sanity documents from this project and dataset. If posts are published anywhere else, they will not appear on the site and Google will not receive the SEO benefit.

## Required Fields

Each blog post must include:

- `title` or `headline`
- `slug.current`
- `publishedAt` or `date`
- `body` or `content` as Portable Text

Strongly recommended fields:

- `mainImage`, `image`, or `coverImage`
- `author`
- `categories`
- `excerpt` or `description`

## Publish Verification

After publishing a test post:

1. Confirm it appears in Sanity Studio under Blog Posts.
2. Confirm it has a slug.
3. Confirm it is published, not just saved as a draft.
4. Confirm it appears on `/resources`.
5. Confirm its article URL opens at `/blog/<slug>`.
6. Confirm the next Vercel production build prerenders that blog URL for SEO.

If any of these fail, the post is not fully connected to the website.
