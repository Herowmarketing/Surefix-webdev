import {defineField, defineType} from 'sanity'

/**
 * Project Inquiry — submissions from the website's purchase/project inquiry stepper form.
 * Documents are created server-side by /api/project-inquiry. Sanity is the source of truth;
 * the operations manager triages each lead here (status, priority, notes, follow-up).
 */
export default defineType({
  name: 'projectInquiry',
  title: 'Project Inquiry',
  type: 'document',
  // Newest submissions first by default in the Studio.
  orderings: [
    {
      title: 'Submitted (newest first)',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
    {
      title: 'Submitted (oldest first)',
      name: 'submittedAtAsc',
      by: [{field: 'submittedAt', direction: 'asc'}],
    },
  ],
  groups: [
    {name: 'lead', title: 'Lead', default: true},
    {name: 'crm', title: 'CRM / Tracking'},
    {name: 'attribution', title: 'Attribution'},
    {name: 'meta', title: 'Metadata'},
  ],
  fields: [
    // ── Lead details ──────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      group: 'lead',
      validation: (Rule) => Rule.required().error('A client name is required.'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'lead',
      validation: (Rule) =>
        Rule.required().email().error('A valid email address is required.'),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'lead',
      validation: (Rule) => Rule.required().error('A phone number is required.'),
    }),
    defineField({
      name: 'projectAddress',
      title: 'Project Address / Service Area',
      description: 'ZIP code or address the client provided (helps confirm we serve the area).',
      type: 'string',
      group: 'lead',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      description: 'The service the client selected in the stepper (e.g. Kitchen, Bathroom).',
      type: 'string',
      group: 'lead',
    }),
    defineField({
      name: 'budgetRange',
      title: 'Budget Range',
      description: 'Only present if the form collected a budget. Often empty.',
      type: 'string',
      group: 'lead',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      description: 'When the client is hoping to start.',
      type: 'string',
      group: 'lead',
    }),
    defineField({
      name: 'projectDetails',
      title: 'Project Details',
      type: 'text',
      rows: 4,
      group: 'lead',
    }),
    defineField({
      name: 'preferredContactMethod',
      title: 'Preferred Contact Method',
      type: 'string',
      group: 'lead',
    }),

    // ── CRM / Tracking ────────────────────────────────────────────────────────
    defineField({
      name: 'status',
      title: 'Status',
      description: 'Where this lead is in the pipeline.',
      type: 'string',
      group: 'crm',
      initialValue: 'new',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Reviewed', value: 'reviewed'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Estimate Scheduled', value: 'estimateScheduled'},
          {title: 'Proposal Sent', value: 'proposalSent'},
          {title: 'Won', value: 'won'},
          {title: 'Lost', value: 'lost'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      group: 'crm',
      initialValue: 'medium',
      options: {
        list: [
          {title: 'Low', value: 'low'},
          {title: 'Medium', value: 'medium'},
          {title: 'High', value: 'high'},
          {title: 'Urgent', value: 'urgent'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'followUpDate',
      title: 'Follow-Up Date',
      description: 'Date the team should follow up with this lead.',
      type: 'date',
      group: 'crm',
    }),
    defineField({
      name: 'assignedTo',
      title: 'Assigned To',
      description: 'Team member responsible for this lead.',
      type: 'string',
      group: 'crm',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      description: 'Private notes for the team — never shown to the client.',
      type: 'text',
      rows: 4,
      group: 'crm',
    }),

    // ── Metadata ──────────────────────────────────────────────────────────────
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      group: 'meta',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'sourcePage',
      title: 'Source',
      description: 'Where the submission originated.',
      type: 'string',
      group: 'meta',
      initialValue: 'purchase-inquiry-stepper',
      readOnly: true,
    }),
    defineField({
      name: 'utmSource',
      title: 'UTM Source',
      type: 'string',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'utmMedium',
      title: 'UTM Medium',
      type: 'string',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'utmCampaign',
      title: 'UTM Campaign',
      type: 'string',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'utmTerm',
      title: 'UTM Term',
      type: 'string',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'utmContent',
      title: 'UTM Content',
      type: 'string',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'gclid',
      title: 'Google Click ID (gclid)',
      type: 'string',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'gbraid',
      title: 'Google Click ID (gbraid)',
      type: 'string',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'wbraid',
      title: 'Google Click ID (wbraid)',
      type: 'string',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'msclkid',
      title: 'Microsoft Click ID',
      type: 'string',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'fbclid',
      title: 'Facebook Click ID',
      type: 'string',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'landingPage',
      title: 'Landing Page',
      type: 'url',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'landingPagePath',
      title: 'Landing Page Path',
      type: 'string',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'conversionPage',
      title: 'Conversion Page',
      type: 'url',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'referrer',
      title: 'Referrer',
      type: 'url',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'firstSeenAt',
      title: 'First Seen At',
      type: 'datetime',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'lastSeenAt',
      title: 'Last Seen At',
      type: 'datetime',
      group: 'attribution',
      readOnly: true,
    }),
    defineField({
      name: 'notificationStatus',
      title: 'Email Notification Status',
      description: 'Whether the internal notification email was sent successfully.',
      type: 'string',
      group: 'meta',
      readOnly: true,
    }),
    defineField({
      name: 'rawSubmissionData',
      title: 'Raw Submission Data',
      description: 'Unmodified payload received from the form (for debugging / audit).',
      type: 'text',
      rows: 6,
      group: 'meta',
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      name: 'name',
      projectType: 'projectType',
      status: 'status',
    },
    prepare({name, projectType, status}) {
      return {
        title: `${name || 'Unknown'} – ${projectType || 'Project'}`,
        subtitle: `Status: ${status || 'new'}`,
      }
    },
  },
})
