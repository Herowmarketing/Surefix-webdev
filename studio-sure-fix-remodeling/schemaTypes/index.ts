import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import projectInquiry from './projectInquiry'
import candidateApplication from './candidateApplication'

export const schemaTypes = [
  // Intake / CRM
  projectInquiry,
  candidateApplication,
  // Blog
  post,
  author,
  category,
  blockContent,
]
