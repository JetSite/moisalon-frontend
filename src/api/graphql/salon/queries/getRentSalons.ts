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

export const GET_RENT_SALONS = gql`
  query salons($citySlug: String!,$itemsCount: Int!, $id: ID) {
    salons(filters:{cities:{citySlug:{eq:$citySlug }}, and: [{salonWorkplacesCount: {gt: 0}}, {id: {ne: $id}}]}, pagination: { page: 1, pageSize: $itemsCount }) {
      data {
        id
        attributes {
            salonName
            salonID
            salonAddress
            salonIsPublished
            salonIsNotRent
            salonWebSiteUrl
            salonEmail
            salonPhones {
              ${phonesFragment}
            }
            salonOwnerConfirmed
            salonOnlineBookingUrl
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
            salonDescription
            salonContactPersonName
            salonContactPersonPhone
            salonContactPersonEmail
            salonCantactPresonWorkingHoursAt
            salonCantactPresonWorkingHoursTo
            salonWorkplacesCount
            salonMastersCount
            salonBrandsCount
            createdAt
            updatedAt
            publishedAt
            reviewsCount
            ratingCount
            rating
            salonCover {
              ${imageInfo}
            }
            salonLogo {
              ${imageInfo}
            }
            salonPhotos {
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
            cities {
              ${cityFragment}
            }
          }
        }
      ${metaInfo}
    }
  }
`
