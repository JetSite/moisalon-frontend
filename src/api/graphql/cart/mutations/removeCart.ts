import { gql } from '@apollo/client'

export const REMOVE_CART = gql`
  mutation deleteCart($id: ID!) {
    deleteCart(id: $id) {
      data {
        id
      }
    }
  }
`
