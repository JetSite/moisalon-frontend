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
            salonName
            latitude
            longitude
            locationDirections
            cities {
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
                    activityName
                  }
                }
              }
              
            salonID
            salonAddress
            salonIsPublished
            salonIsNotRent
            salonWebSiteUrl
            salonEmail
            salonPhones {
              ${phonesFragment}
            }
            socialNetworks {
              ${socialNetworksFragment}
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
