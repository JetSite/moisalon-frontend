import { imageInfo } from '../../common/imageInfo'
import { reviewsFragment } from '../../fragments/reviews'

export const educationFragment = `
      data {
        id
        attributes {
            title
            slug
            averageScore
            dateStart
            dateEnd
            timeStart
            timeEnd
            deleted
            shortDescription
            fullDescription
            isPublished
            publishedAt
            numberScore
            cover {
                ${imageInfo}
            }
            sumScore
            amount
            reviews {
              ${reviewsFragment}
            }
            master {
              data {
                id
                attributes {
                  name
                }
              }
            }
            salon {
              data {
                id
                attributes {
                  name
                }
              }
            }
            brand {
              data {
                id
                attributes {
                  name
                }
              }
            }
            user {
              data {
                id
              }
            }
        }
      }
`
