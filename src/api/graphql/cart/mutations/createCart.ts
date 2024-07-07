import { gql } from '@apollo/client'
import { productFragment } from '../../product/fragment/product'

export const CREATE_CART = gql`
  mutation createCart($data: CartInput!) {
    createCart(data: $data) {
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
