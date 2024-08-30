import { imageInfo } from '../../common/imageInfo'
import { cityFragment } from '../../fragments/city'
import { promotionFragment } from '../../fragments/promotion'
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
      address    
      rent
      webSiteUrl
      email
      videoReviewUrl
      salonPhones {
        phoneNumber
        haveTelegram
        haveWhatsApp
        haveViber
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
      services {
      ${salonServicesFragment}
      }
      ratings {
        ${ratingsFragment}
      }
      reviews {
        ${reviewsFragment}
      }
      promotions {
        ${promotionFragment}
      }

  }
}`
