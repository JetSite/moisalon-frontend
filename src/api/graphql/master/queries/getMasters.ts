import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { cityInfo } from 'src/api/graphql/common/cityInfo'
import { reviewsFragment } from '../../fragments/reviews'
import { ratingsFragment } from '../../fragments/ratings'
import servicesFragment from '../../fragments/services'

export const getMasters = gql`
  query masters($slug: String!,$itemsCount: Int!, $excludeId: ID) {
    masters(filters:{city:{slug:{eq:$slug }}, id:{ne: $excludeId}}, pagination: { page: 1, pageSize: $itemsCount }) {
      data {
        id
        attributes {
            name
            rating 
            ratingCount 
            reviewsCount
            services {
             ${servicesFragment}
            }
            city {
              ${cityInfo}
            }
            photo {
              ${imageInfo}
            }
            reviews {
              ${reviewsFragment}
            }
            ratings {
              ${ratingsFragment}
            }
        }
      }
      meta {
        ${metaInfo}
      }
    }
  }
`
