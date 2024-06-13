import { gql } from '@apollo/client'
import { cityFragment } from '../../fragments/city'
import { phonesFragment } from '../../fragments/phones'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import { imageInfo } from '../../common/imageInfo'
import { masterFragment } from '../../me/fragments/master'
import {
  salonAdministratorsFragment,
  salonServicesFragment,
} from '../fragments'
import { brandsFragment } from '../../fragments/brands'
import salonServicesMFragment from '../fragments/salonServicesMFragment'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import { vacanciesFragment } from '../../me/fragments/vacancies'

export const SALON_USER_ID = gql`
  query Salons($id: ID!) {
    salons(filters: { user: { id: { eq: $id } } }) {
      data {
        id
        attributes {
            name
            latitude
            longitude
            locationDirections
            city {
              ${cityFragment}
            }
            user {
              data {
                id
              }
            }
            activities {
                data {
                  id
                  attributes {
                    title
                  }
                }
              }
              
            salonID
            address
            published
            rent
            webSiteUrl
            email
            salonPhones {
              ${phonesFragment}
            }
            socialNetworks {
              ${socialNetworksFragment}
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
            servicesM {
              ${salonServicesMFragment}
            }
            ratings {
              ${ratingsFragment}
            }
            reviews {
              ${reviewsFragment}
            }
            vacancies {
              ${vacanciesFragment}
            }
        }
      }
    }
  }
`
