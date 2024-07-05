import { gql } from '@apollo/client'

export const CREATE_ORDER_ADDRESS = gql`
  mutation createOrderAddress($data: OrderAddressInput!) {
    createOrderAddress(data: $data) {
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
