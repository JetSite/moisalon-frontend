import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import { metaInfo } from 'src/api/graphql/common/metaInfo'
import { salonServicesFragment } from '../fragments'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import { phonesFragment } from '../../fragments/phones'
import { cityFragment } from '../../fragments/city'

export const getSalonsThroughCity = gql`
  query getSalonsThroughCity($slug: [String], $pageSize: Int, $page: Int, $sort: [String]) {
    salons(
      filters: { city: { slug: { in: $slug } } }
      pagination: { pageSize: $pageSize, page: $page }, sort: $sort
    ) {
      data {
        id
        attributes {
          name
          slug
          salonID
          address
          published
          rent
          webSiteUrl
          email
          salonPhones {
            ${phonesFragment}
          }
          socialNetworks {
            title
            link
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
            city {
              ${cityFragment}
            }
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
      meta {
        ${metaInfo}
      }
    }
  }
`
