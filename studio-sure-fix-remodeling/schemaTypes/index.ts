import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import projectInquiry from './projectInquiry'
import candidateApplication from './candidateApplication'
import resourceItem from './resourceItem'

export const schemaTypes = [
  // Intake / CRM
  projectInquiry,
  candidateApplication,
  // Blog
  post,
  resourceItem,
  author,
  category,
  blockContent,
]
