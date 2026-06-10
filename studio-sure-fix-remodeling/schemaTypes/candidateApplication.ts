import {defineField, defineType} from 'sanity'

/**
 * Candidate Application — submissions from the Careers page application form.
 * Documents are created server-side by /api/candidate-application. The operations
 * manager reviews and moves candidates through the hiring pipeline here.
 */
export default defineType({
  name: 'candidateApplication',
  title: 'Candidate Application',
  type: 'document',
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
    {name: 'applicant', title: 'Applicant', default: true},
    {name: 'experience', title: 'Experience'},
    {name: 'crm', title: 'Hiring / Tracking'},
    {name: 'meta', title: 'Metadata'},
  ],
  fields: [
    // ── Applicant ─────────────────────────────────────────────────────────────
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      group: 'applicant',
      validation: (Rule) => Rule.required().error('A full name is required.'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'applicant',
      validation: (Rule) =>
        Rule.required().email().error('A valid email address is required.'),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'applicant',
      validation: (Rule) => Rule.required().error('A phone number is required.'),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'City / town the applicant is based in.',
      type: 'string',
      group: 'applicant',
    }),
    defineField({
      name: 'positionAppliedFor',
      title: 'Position Applied For',
      type: 'string',
      group: 'applicant',
      validation: (Rule) => Rule.required().error('A position is required.'),
    }),
    defineField({
      name: 'isGeneralApplication',
      title: 'General Application',
      description: 'True when the applicant did not apply to a specific open role.',
      type: 'boolean',
      group: 'applicant',
      initialValue: false,
    }),
    defineField({
      name: 'tradeOrDepartmentInterest',
      title: 'Trade / Department Interest',
      type: 'string',
      group: 'applicant',
    }),

    // ── Experience ────────────────────────────────────────────────────────────
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'string',
      group: 'experience',
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'text',
      rows: 3,
      group: 'experience',
    }),
    defineField({
      name: 'certificationsOrLicenses',
      title: 'Certifications / Licenses',
      type: 'text',
      rows: 2,
      group: 'experience',
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume URL',
      description: 'Link to a hosted resume (file uploads not yet supported — see TODO).',
      type: 'url',
      group: 'experience',
    }),
    defineField({
      name: 'portfolioUrl',
      title: 'Portfolio URL',
      type: 'url',
      group: 'experience',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'experience',
    }),
    defineField({
      name: 'availabilityOrStartDate',
      title: 'Availability / Start Date',
      type: 'string',
      group: 'experience',
    }),
    defineField({
      name: 'workAuthorization',
      title: 'Authorized to Work in the US',
      type: 'string',
      group: 'experience',
    }),
    defineField({
      name: 'reliableTransportation',
      title: 'Reliable Transportation',
      type: 'string',
      group: 'experience',
    }),
    defineField({
      name: 'additionalNotes',
      title: 'Additional Notes',
      type: 'text',
      rows: 4,
      group: 'experience',
    }),

    // ── Hiring / Tracking ─────────────────────────────────────────────────────
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'crm',
      initialValue: 'new',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Reviewing', value: 'reviewing'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Interview Scheduled', value: 'interviewScheduled'},
          {title: 'Offer Extended', value: 'offerExtended'},
          {title: 'Hired', value: 'hired'},
          {title: 'Not a Fit', value: 'notAFit'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ratingOrPriority',
      title: 'Rating / Priority',
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
      type: 'date',
      group: 'crm',
    }),
    defineField({
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'string',
      group: 'crm',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      description: 'Private notes for the hiring team.',
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
      type: 'string',
      group: 'meta',
      initialValue: 'careers-page',
      readOnly: true,
    }),
    defineField({
      name: 'notificationStatus',
      title: 'Email Notification Status',
      type: 'string',
      group: 'meta',
      readOnly: true,
    }),
    defineField({
      name: 'rawSubmissionData',
      title: 'Raw Submission Data',
      type: 'text',
      rows: 6,
      group: 'meta',
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      fullName: 'fullName',
      positionAppliedFor: 'positionAppliedFor',
      status: 'status',
    },
    prepare({fullName, positionAppliedFor, status}) {
      return {
        title: `${fullName || 'Unknown'} – ${positionAppliedFor || 'General Application'}`,
        subtitle: `Status: ${status || 'new'}`,
      }
    },
  },
})
