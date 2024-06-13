import { imageInfo } from '../common/imageInfo'

export const reviewsFragment = `
data {
  id
  attributes {
    title
    title
    content
    rating {
      data {
        id
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
          email
          phone
          avatar {
            ${imageInfo}
          }
        }
      }
    }
  }
}
`
