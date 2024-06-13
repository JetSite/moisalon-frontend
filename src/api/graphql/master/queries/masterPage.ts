import { gql } from '@apollo/client'
import { imageInfo } from 'src/api/graphql/common/imageInfo'
import { reviewsFragment } from '../../fragments/reviews'
import { ratingsFragment } from '../../fragments/ratings'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import { salonFragment } from '../../me/fragments/salon'
import { cityFragment } from '../../fragments/city'
import servicesFragment from '../../fragments/services'
import { brandsFragment } from '../../fragments/brands'

export const MASTER_PAGE = gql`
  query master($id: ID!) {
    master(id: $id) {
      data {
        id
        attributes {
          name
          name
          reviewsCount
          rating
          ratingCount
          webSiteUrl
          slug
          seoDescription
          description
          haveViber
          haveTelegram
          haveWhatsApp
          searchWork
          phone
          phone
          email
          email
          address
          office
          onlineBookingUrl
          latitude
          longitude
          reviews {
            ${reviewsFragment}
          }
          ratings {
           ${ratingsFragment}
          }
          photosDiploma {
            ${imageInfo}
          }
          salons {
            ${salonFragment}
          }
          brands{
            ${brandsFragment}
          }
          photo {
            ${imageInfo}
          }
          photo {
            ${imageInfo}
          }
          photosWorks{
            ${imageInfo}
          }
          socialNetworks {
            ${socialNetworksFragment}
          }
          city {
           ${cityFragment}
          }
          services {
           ${servicesFragment}
          }
          resumes {
            data {
              id
              attributes {
                title
                content
                specialization
                age
                workSchedule
                salary
              }
            }
          }
        }
      }
    }
  }
`
