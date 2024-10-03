import { gql } from '@apollo/client'
import { reviewsFragment } from '../../fragments/reviews'
import { metaInfo } from '../../common/metaInfo'
import { ratingsFragment } from '../../fragments/ratings'
import {
  salonAdministratorsFragment,
  salonServicesFragment,
} from '../fragments'
import { brandsFragment } from '../../fragments/brands'
import { masterFragment } from '../../me/fragments/master'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import { imageInfo } from '../../common/imageInfo'
import { phonesFragment } from '../../fragments/phones'
import { cityFragment } from '../../fragments/city'
import { contactPersonWHFragment } from '../../fragments/contactPersonWH'

export const GET_RENT_SALONS = gql`
  query salons($slug: String!,$pageSize: Int, $id: ID, $sort: [String], $page: Int) {
    salons(
      filters: {city:{slug:{eq:$slug }}, and: [{workplacesCount: {gt: 0}}, {rent: {eq: true}}, {id: {ne: $id}}]},
     pagination: { page: $page, pageSize: $pageSize },
     sort: $sort
     ) {
      data {
        id
        attributes {
            name
            address
            rent
            webSiteUrl
            email
            videoReviewUrl
            salonPhones {
              ${phonesFragment}
            }
            ownerConfirmed
            onlineBookingUrl
            workingHours {
              endTime
              startTime
              dayOfWeek
            }
            metro_stations {
              data {
                id
                attributes {
                  title
                }
              }
            }
            description
            contactPersonName
            contactPersonPhone
            contactPersonEmail
            contactPersonWH {
              ${contactPersonWHFragment}
            }
            workplacesCount
            mastersCount
            brandsCount
            createdAt
            updatedAt
            reviewsCount
            ratingCount
            rating
            cover {
              ${imageInfo}
            }
            logo {
              ${imageInfo}
            }
            photos {
              ${imageInfo}
            }
            socialNetworks {
              ${socialNetworksFragment}
            }
            masters {
              ${masterFragment}
            }
            administrators {
              ${salonAdministratorsFragment}
            }
            brands {
              ${brandsFragment}
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
