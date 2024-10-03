import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { productFragment } from '../fragment/product'

export const PRODUCT_CATEGORIES_BY_TITLE = gql`
  query productCategories ($itemsCount: Int, $page: Int, $isAvailableInStock: Int, $title: String) {
  productCategories(
    pagination: { page: $page, pageSize: $itemsCount }, 
    filters: {title: {containsi: $title}, products: {availableInStock: {gt: $isAvailableInStock}}}
    ) {
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
