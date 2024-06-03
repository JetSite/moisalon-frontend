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
  query salons($citySlug: String!,$itemsCount: Int!) {
    salons(filters:{cities:{citySlug:{eq:$citySlug }}}, pagination: { page: 1, pageSize: $itemsCount }) {
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
            salonContactPersonWorkingHoursAt
            salonContactPersonWorkingHoursTo
            salonWorkplacesCount
            salonMastersCount
            salonBrandsCount
            createdAt
            updatedAt
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
