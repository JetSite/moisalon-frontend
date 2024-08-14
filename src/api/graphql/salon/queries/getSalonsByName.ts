import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { cityInfo } from 'src/api/graphql/common/cityInfo'
import { reviewsFragment } from '../../fragments/reviews'
import { ratingsFragment } from '../../fragments/ratings'
import servicesFragment from '../../fragments/services'
import { cityFragment } from '../../fragments/city'
import { salonServicesFragment } from '../fragments'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import { phonesFragment } from '../../fragments/phones'

export const getSalonsByName = gql`
  query salons($name: String!) {
    salons(filters: { name: { containsi: $name } }, pagination: { page: 1, pageSize: 100 }) {
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
