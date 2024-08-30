import { gql } from '@apollo/client'
import servicesFragment from '../../fragments/services'
import { cityInfo } from '../../common/cityInfo'
import { imageInfo } from '../../common/imageInfo'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import { cityFragment } from '../../fragments/city'
import { reviewsFragment } from '../../fragments/reviews'
import { ratingsFragment } from '../../fragments/ratings'
import { salonFragment } from '../../me/fragments/salon'
import { brandsFragment } from '../../fragments/brands'
import { resumeFragment } from '../../fragments/resume'

export const UPDATE_MASTER = gql`
  mutation updateMaster($masterId: ID!, $input: MasterInput!) {
    updateMaster(id: $masterId, data: $input) {
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
