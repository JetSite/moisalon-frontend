import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { cityInfo } from 'src/api/graphql/common/cityInfo'
import { salonServicesFragment } from '../../salon/fragments'
import masterServicesFragment from '../frahments/masterServices'
import servicesFragment from '../../fragments/services'
import { reviewsFragment } from '../../fragments/reviews'
import { ratingsFragment } from '../../fragments/ratings'

export const getMastersTroughCity = gql`
  query masters($slug: [String], $sort: [String], $page: Int, $pageSize: Int, $searchWork: Boolean) {
    masters(filters: {city: {slug: {in: $slug}}, and: [{searchWork:{eq: $searchWork}}]}, pagination: { page: $page, pageSize: $pageSize }, sort: $sort) {
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
            reviews {
              ${reviewsFragment}
            }
            ratings {
              ${ratingsFragment}
            }
            photo {
              ${imageInfo}
            }
        }
      }
      meta {
        ${metaInfo}
      }
    }
  }
`
