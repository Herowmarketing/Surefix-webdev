import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Sure-Fix Remodeling',

  projectId: 'kqp67u17',
  dataset: 'production',

  plugins: [
    structureTool({
      // Custom desk so the operations manager sees intake first, newest submissions on top.
      structure: (S) =>
        S.list()
          .title('Sure-Fix Remodeling')
          .items([
            S.listItem()
              .title('Project Inquiries')
              .schemaType('projectInquiry')
              .child(
                S.documentTypeList('projectInquiry')
                  .title('Project Inquiries')
                  .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
              ),
            S.listItem()
              .title('Candidate Applications')
              .schemaType('candidateApplication')
              .child(
                S.documentTypeList('candidateApplication')
                  .title('Candidate Applications')
                  .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
              ),
            S.divider(),
            S.listItem()
              .title('Blog Posts')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem()
              .title('Resources / Print Guides')
              .schemaType('resourceItem')
              .child(
                S.documentTypeList('resourceItem')
                  .title('Resources / Print Guides')
                  .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
              ),
            S.listItem()
              .title('Authors')
              .schemaType('author')
              .child(S.documentTypeList('author').title('Authors')),
            S.listItem()
              .title('Categories')
              .schemaType('category')
              .child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
