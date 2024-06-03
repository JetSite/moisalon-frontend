import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import { salonServicesFragment } from '../fragments'
import salonServicesMFragment from '../fragments/salonServicesMFragment'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import { cityFragment } from '../../fragments/city'

export const getOtherSalons = gql`
  query Salons($id:ID) {
    salons(filters: {id: {ne: $id}}) {
      data {
        id
        attributes {
            salonName
            cities {
              ${cityFragment}
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
            
            salonOwnerConfirmed
            salonOnlineBookingUrl
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
      }
    }
  }
`
