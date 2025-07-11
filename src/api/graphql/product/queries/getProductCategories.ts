import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { productFragment } from '../fragment/product'

export const PRODUCT_CATEGORIES = gql`
  query productCategories ($itemsCount: Int, $page: Int) {
    productCategories(pagination: { page: $page, pageSize: $itemsCount }) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`
