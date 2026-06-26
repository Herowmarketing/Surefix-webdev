import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resourceItem',
  title: 'Resource Item',
  type: 'document',
  orderings: [
    {
      title: 'Published (newest first)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('A title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'kind',
      title: 'Resource Type',
      type: 'string',
      initialValue: 'print',
      options: {
        list: [
          {title: 'Print Guide', value: 'print'},
          {title: 'Featured / Press Item', value: 'featured'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: 'dateLabel',
      title: 'Date / Season Label',
      description: 'Examples: 2026, Seasonal, Spring 2026.',
      type: 'string',
    }),
    defineField({
      name: 'formatLabel',
      title: 'Format Label',
      description: 'Examples: Print brochure, Lookbook, Event handout, Magazine feature.',
      type: 'string',
      initialValue: 'Print guide',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'file',
      title: 'PDF / Download File',
      description: 'Upload a PDF if visitors should be able to download the item directly.',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      description: 'Use this for press mentions, hosted PDFs, or external publications.',
      type: 'url',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      description: 'Examples: Download PDF, Read Feature, Request a Copy.',
      type: 'string',
    }),
    defineField({
      name: 'isPublished',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'formatLabel',
      media: 'image',
    },
  },
})
