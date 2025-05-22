import { gql } from '@apollo/client'
import { productFragment } from '../fragment/product'
import { metaInfo } from '../../common/metaInfo'
import { poductCategoryFragment } from '../fragment/productCategory'
import { brandForProductFragment } from '../fragment/brandForProduct'
import { imageInfo } from '../../common/imageInfo'
import { attributesAttrValueFragment } from '../fragment/attributesAttrValue'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'

export const PRODUCTS = gql`
  query getProducts($filtersInput: ProductFiltersInput, $pageSize: Int, $page: Int,) {
    products(filters: $filtersInput, pagination: { pageSize: $pageSize, page: $page }) {
      data {
        id
        attributes {
          name
          sku
          regularPrice
          salePrice
          shortDescription
          availableInStock
          brand {
            ${brandForProductFragment}
          }
          cover {
            ${imageInfo}
          }
        }
      }
        meta {
          ${metaInfo}
        }
    }
}
`
