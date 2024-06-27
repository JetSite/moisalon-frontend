import { gql } from '@apollo/client'
import { productFragment } from '../../product/fragment/product'

export const CREATE_ORDER = gql`
  mutation createOrder($data: OrderInput!) {
    createOrder(data: $data) {
      data {
        id
        attributes {
          cartContent {
            product {
              ${productFragment}
            }
            quantity
          }
          comment
          user {
            data {
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
