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
  query salons($city: String!,$itemsCount: Int!) {
    salons(filters:{cities:{cityName:{eq:$city }}}, pagination: { page: 1, pageSize: $itemsCount }) {
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
            salonPhones {
              phoneNumber
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
