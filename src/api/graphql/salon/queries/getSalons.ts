import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import {
  salonAdministratorsFragment,
  salonServicesFragment,
} from '../fragments'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import { masterFragment } from '../../me/fragments/master'
import { brandsFragment } from '../../fragments/brands'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import { phonesFragment } from '../../fragments/phones'
import { cityFragment } from '../../fragments/city'

export const getSalons = gql`
  query salons($slug: String!,$itemsCount: Int!) {
    salons(filters:{city:{slug:{eq:$slug }}}, pagination: { page: 1, pageSize: $itemsCount }) {
      data {
        id
        attributes {
            name
            salonID
            address
            published
            rent
            webSiteUrl
            email
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
            salonContactPersonWorkingHoursAt
            salonContactPersonWorkingHoursTo
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
