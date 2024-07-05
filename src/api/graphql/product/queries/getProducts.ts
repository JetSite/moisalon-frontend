import { gql } from '@apollo/client'
import { productFragment } from '../fragment/product'

export const getProducts = gql`
  query getProducts($filtersInput: ProductFiltersInput) {
    products(filters: $filtersInput) {
        ${productFragment}
    }
}
`
