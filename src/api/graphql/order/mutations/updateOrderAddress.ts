import { gql } from '@apollo/client'

export const UPDATE_ORDER_ADDRESS = gql`
  mutation updateOrderAddress($id: ID!, $data: OrderAddressInput!) {
    updateOrderAddress(id: $id, data: $data) {
      data {
        id
        attributes {
          city
          zipCode
          address
        }
      }
    }
  }
`
