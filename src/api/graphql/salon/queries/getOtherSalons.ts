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
            name
            city {
              ${cityFragment}
            }
            salonID
            address
            published
            rent
            webSiteUrl
            email
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
            
            ownerConfirmed
            onlineBookingUrl
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
