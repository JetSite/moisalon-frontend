import { imageInfo } from '../../common/imageInfo'
import { cityFragment } from '../city'
import { phonesFragment } from '../phones'
import { ratingsFragment } from '../ratings'

export const searchBrandFragment = `
      data {
        id
        attributes {
          name
          slug
          seoTitle
          seoDescription
          description
          address
          name
          rating
          ratingCount
          reviewsCount
          email
          ratings {
            ${ratingsFragment}
          }
          city {
            ${cityFragment}
          }
          logo {
            ${imageInfo}
          }
         
          phones {
           ${phonesFragment}
        }
      }
    }
`
