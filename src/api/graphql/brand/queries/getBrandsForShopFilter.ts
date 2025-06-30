import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import { ratingsFragment } from '../../fragments/ratings'
import { socialNetworksFragment } from '../../fragments/socialNetworks'

export const BRANDS_FOR_SHOP_FILTER = gql`
  query brands($itemsCount: Int, $page: Int, $isAvailableInStock: Int) {
    brands(
      pagination: { page: $page, pageSize: $itemsCount }
      filters: { products: { availableInStock: { gt: $isAvailableInStock } } }
    ) {
      data {
        id
        attributes {
          name
          email
          logo {
            ${imageInfo}
          }
          ratings {
            ${ratingsFragment}
          }
          socialNetworks {
            ${socialNetworksFragment}
          }
        }
      }
    }
  }
`
