import { gql } from '@apollo/client'
import { productFragment } from '../../product/fragment/product'
import { ordersFragment } from '../../me/fragments/orders'

export const ORDERS_BY_USER = gql`
  query ordersByUser($filters: OrderFiltersInput) {
    orders(filters: $filters) {
      ${ordersFragment}
    }
  }
`
