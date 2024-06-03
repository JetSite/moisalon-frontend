import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import { metaInfo } from 'src/api/graphql/common/metaInfo'
import { salonServicesFragment } from '../fragments'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import { phonesFragment } from '../../fragments/phones'
import { cityFragment } from '../../fragments/city'

export const getSalonsThroughCity = gql`
  query getSalonsThroughCity($citySlug: [String], $pageSize: Int, $page: Int, $sort: [String]) {
    salons(
      filters: { cities: { citySlug: { in: $citySlug } } }
      pagination: { pageSize: $pageSize, page: $page }, sort: $sort
    ) {
      data {
        id
        attributes {
          salonName
          slug
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
            title
            link
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
            cities {
              ${cityFragment}
            }
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
      ${metaInfo}
    }
  }
`
