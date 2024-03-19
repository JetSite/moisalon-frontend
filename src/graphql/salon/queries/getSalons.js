import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import {
  salonAdministratorsFragment,
  salonBrandsFragment,
  salonMastersFragment,
  salonReviewsFragment,
  salonServicesFragment,
} from '../fragments'

export const getSalons = gql`
  query salons {
    salons {
      data {
        id
        attributes {
            salonName
            salonID
            salonAddress
            salonIsPublished
            salonIsNotRent
            salonWebSiteUrl
            salonEmail
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
            salonPhones {
              id
              phoneNumber
              phoneTitle
              phoneContact
            }
            workingHours {
              id
              dayOfWeek
              startTime
              endTime
            }
            socialNetworks {
              id
              title
              link
              s_network {
                data {
                  id
                  attributes {
                    title
                    logo {
                      ${imageInfo}
                    }
                    slug
                  }
                }
              }
            }
            ${salonAdministratorsFragment}
            ${salonBrandsFragment}
            ${salonMastersFragment}
            ${salonReviewsFragment}
            ${salonServicesFragment}
        }
      }
      ${metaInfo}
    }
  }
`
