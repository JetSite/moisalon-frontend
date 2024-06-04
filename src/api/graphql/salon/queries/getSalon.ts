import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import {
  salonAdministratorsFragment,
  salonBrandsFragment,
  salonMastersFragment,
  salonReviewsFragment,
  salonServicesFragment,
} from '../fragments'
import salonServicesMFragment from '../fragments/salonServicesMFragment'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import { cityFragment } from '../../fragments/city'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import { masterFragment } from '../../me/fragments/master'
import { brandsFragment } from '../../fragments/brands'
import { phonesFragment } from '../../fragments/phones'
import { vacanciesFragment } from '../../me/fragments/vacancies'

export const getSalonPage = gql`
  query salon($id: ID) {
    salon(id: $id) {
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
