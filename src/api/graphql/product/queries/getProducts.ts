import { gql } from '@apollo/client'
import { productFragment } from '../fragment/product'
import { metaInfo } from '../../common/metaInfo'

export const PRODUCTS = gql`
  query getProducts($filtersInput: ProductFiltersInput, $pageSize: Int, $page: Int,) {
    products(filters: $filtersInput, pagination: { pageSize: $pageSize, page: $page }) {
        ${productFragment}
        meta {
          ${metaInfo}
        }
    }
}
`
