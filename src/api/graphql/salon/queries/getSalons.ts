import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { salonServicesFragment } from '../fragments'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import { phonesFragment } from '../../fragments/phones'
import { cityFragment } from '../../fragments/city'

export const getSalons = gql`
  query salons($slug: String!,$itemsCount: Int!) {
    salons(filters:{city:{slug:{eq:$slug }}}, pagination: { page: 1, pageSize: $itemsCount }) {
      data {
        id
        attributes {
            name
            address
            rent
            email
            latitude
            longitude
            salonPhones {
              ${phonesFragment}
            }
            reviewsCount
            ratingCount
            rating
            cover {
              ${imageInfo}
            }
            photos {
              ${imageInfo}
            }
            services {
              ${salonServicesFragment}
            }
            ratings {
              ${ratingsFragment}
            }
            reviews {
              ${reviewsFragment}
            }
            city {
              ${cityFragment}
            }
          }
        }
      meta {
        ${metaInfo}
      }
    }
  }
`
