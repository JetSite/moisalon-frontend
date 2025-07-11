import { gql } from '@apollo/client'

export const PRODUCTS = gql`
  query getProducts($filtersInput: ProductFiltersInput, $pageSize: Int, $page: Int) {
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
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`
