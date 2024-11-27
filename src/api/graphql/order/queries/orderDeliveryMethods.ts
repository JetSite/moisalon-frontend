import { gql } from '@apollo/client'

export const ORDERS_DELIVERY_METHODS = gql`
  query orderDeliveryMethods {
    orderDeliveryMethods {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`
