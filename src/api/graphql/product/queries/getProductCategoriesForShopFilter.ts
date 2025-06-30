import { gql } from '@apollo/client'

export const PRODUCT_CATEGORIES_FOR_SHOP_FILTER = gql`
  query productCategories(
    $itemsCount: Int
    $page: Int
    $isAvailableInStock: Int
  ) {
    productCategories(
      pagination: { page: $page, pageSize: $itemsCount }
      filters: { products: { availableInStock: { gt: $isAvailableInStock } } }
    ) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`
