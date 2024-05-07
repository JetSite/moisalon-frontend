import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import {
  salonAdministratorsFragment,
  salonBrandsFragment,
  salonMastersFragment,
  salonReviewsFragment,
  salonServicesFragment,
} from '../fragments'

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
              data {
                id
                attributes {
                  citySlug
                  cityName
                }
              }
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
              phoneNumber
              haveTelegram
              haveWhatsApp
              haveViber
            }
            socialNetworks {
              title
              link
            }
            salonAverageScore
            salonSumScore
            salonRating
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
            salonReviewsCount
            salonMastersCount
            salonBrandsCount
            createdAt
            updatedAt
            publishedAt
            salonCover {
              ${imageInfo}
            }
            salonLogo {
              ${imageInfo}
            }
            salonPhotos {
              ${imageInfo}
            }
            ${salonAdministratorsFragment}
            ${salonBrandsFragment}
            ${salonMastersFragment}
            ${salonReviewsFragment}
            ${salonServicesFragment}
        }
      }
    }
  }
`
