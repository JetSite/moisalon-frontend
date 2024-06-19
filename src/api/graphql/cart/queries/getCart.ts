import { gql } from '@apollo/client'
import { productFragment } from '../../product/fragment/product'

export const GET_CART = gql`
  query getCart($id: ID!) {
    cart(id: $id) {
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
