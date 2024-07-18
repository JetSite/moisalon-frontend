import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { cityInfo } from 'src/api/graphql/common/cityInfo'
import { reviewsFragment } from '../../fragments/reviews'
import { ratingsFragment } from '../../fragments/ratings'
import servicesFragment from '../../fragments/services'

export const getMastersByService = gql`
  query masters($serviceId: ID!) {
    masters(filters: { services: {service: { id: { eq: $serviceId } } } }, pagination: { page: 1, pageSize: 100 }) {
      data {
        id
        attributes {
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
                    name
                }
              }
            }
            services {
             ${servicesFragment}
            }
            city {
              ${cityInfo}
            }
            photo {
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
      meta {
        ${metaInfo}
      }
    }
  }
`
