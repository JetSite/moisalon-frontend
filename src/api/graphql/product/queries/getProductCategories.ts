import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { productFragment } from '../fragment/product'

export const PRODUCT_CATEGORIES = gql`
  query productCategories ($itemsCount: Int, $page: Int, $isAvailableInStock: Int) {
  productCategories(pagination: { page: $page, pageSize: $itemsCount }, filters: {products: {availableInStock: {gt: $isAvailableInStock}}}) {
    data {
      id
      attributes {
        title
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
