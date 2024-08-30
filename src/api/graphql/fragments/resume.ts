import { imageInfo } from '../common/imageInfo'
import { cityFragment } from './city'

export const resumeFragment = `
data {
  id
  attributes {
    title
    content
    specialization
    age
    workSchedule
    salary
    city {
      ${cityFragment}
    }
    gender {
      data {
        attributes {
          title
        }
      }
    }
    user {
      data {
        id
        attributes {
          username
        }
      }
    }
    createdAt
    publishedAt
  }
}
`
