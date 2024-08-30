import { gql } from '@apollo/client'
import { imageInfo } from 'src/api/graphql/common/imageInfo'
import { reviewsFragment } from '../../fragments/reviews'
import { ratingsFragment } from '../../fragments/ratings'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import { salonFragment } from '../../me/fragments/salon'
import { cityFragment } from '../../fragments/city'
import servicesFragment from '../../fragments/services'
import { brandsFragment } from '../../fragments/brands'
import { resumeFragment } from '../../fragments/resume'

export const MASTER_PAGE = gql`
  query master($id: ID!) {
    master(id: $id) {
      data {
        id
        attributes {
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
          resume {
            ${resumeFragment}
          }
        }
      }
    }
  }
`
