import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'

export const getOtherSalons = gql`
  query Salons($id:ID) {
    salons(filters: {id: {ne: $id}}) {
      data {
        id
        attributes {
            salonName
            cities {
              data {
                id
                attributes {
                  citySlug
                  cityName
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
        }
      }
    }
  }
`
