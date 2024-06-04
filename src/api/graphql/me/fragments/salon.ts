import { imageInfo } from '../../common/imageInfo'
import { cityFragment } from '../../fragments/city'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import {
  salonAdministratorsFragment,
  salonBrandsFragment,
  salonMastersFragment,
  salonReviewsFragment,
  salonServicesFragment,
} from '../../salon/fragments'
import { brandsFragment } from './brands'
import { masterFragment } from './master'

export const salonFragment = `data {
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
        phoneNumber
        haveTelegram
        haveWhatsApp
        haveViber
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
      services {
      ${salonServicesFragment}
      }
      ratings {
        ${ratingsFragment}
      }
      reviews {
        ${reviewsFragment}
      }

  }
}`
