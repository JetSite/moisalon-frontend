import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import { cityFragment } from '../../fragments/city'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import { reviewsFragment } from '../../fragments/reviews'
import { ratingsFragment } from '../../fragments/ratings'
import { productFragment } from '../../product/fragment/product'
import { metaInfo } from '../../common/metaInfo'

export const BRANDS_TO_SHOP = gql`
  query brands($itemsCount: Int, $page: Int, $isAvailableInStock: Int) {
    brands(
      pagination: { page: $page, pageSize: $itemsCount }, 
      filters: {products: {availableInStock: {gt: $isAvailableInStock}}}
    ) {
      data {
        id
        attributes {
          name
          slug
          seoTitle
          seoDescription
          description
          address
          name
          history
          rating
          ratingCount
          reviewsCount
          email
          office
          latitude
          longitude
          manufacture
          minimalOrderPrice
          termsDeliveryPrice
          webSiteUrl
          socialNetworks {
            ${socialNetworksFragment}
          }
          reviews {
            ${reviewsFragment}
          }
          ratings {
            ${ratingsFragment}
          }
          city {
            ${cityFragment}
          }
          logo {
            ${imageInfo}
          }
          products {
            ${productFragment}
          }
        }
      }
      meta {
        ${metaInfo}
      }
    }
  }
`
