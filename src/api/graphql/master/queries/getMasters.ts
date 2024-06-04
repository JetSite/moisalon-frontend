import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { cityInfo } from 'src/api/graphql/common/cityInfo'
import { reviewsFragment } from '../../fragments/reviews'
import { ratingsFragment } from '../../fragments/ratings'
import servicesFragment from '../../fragments/services'

export const getMasters = gql`
  query masters($citySlug: String!,$itemsCount: Int!, $excludeId: ID) {
    masters(filters:{city:{citySlug:{eq:$citySlug }}, id:{ne: $excludeId}}, pagination: { page: 1, pageSize: $itemsCount }) {
      data {
        id
        attributes {
            masterName
            masterPhone
            masterEmail
            name
            phone
            email
            searchWork
            rating 
            ratingCount 
            reviewsCount
            salons {
              data {
                id
                attributes {
                    salonName
                }
              }
            }
            services {
             ${servicesFragment}
            }
            city {
              ${cityInfo}
            }
            masterPhoto {
              ${imageInfo}
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
      ${metaInfo}
    }
  }
`
