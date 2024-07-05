import { gql } from '@apollo/client'
import { productFragment } from '../../product/fragment/product'

export const UPDATE_CART = gql`
  mutation updateCart($id: ID!, $data: CartInput!) {
    updateCart(id: $id, data: $data) {
      data {
        id
        attributes {
          cartContent {
            product {
              ${productFragment}
            }
            quantity
          }
        }
      }
    }
  }
`
