import { gql } from '@apollo/client'
import { productFragment } from '../../product/fragment/product'

export const GET_CART_BY_USER = gql`
  query getCarts($id: ID!) {
    carts(filters:{user: {id: {eq: $id}}}) {
      data {
        id
        attributes {
          cartContent {
            product {
              ${productFragment}
            }
            quantity
          }
          total
          user {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`
