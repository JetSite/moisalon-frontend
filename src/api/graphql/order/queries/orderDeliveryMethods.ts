import { gql } from '@apollo/client'
import { ordersFragment } from '../../me/fragments/orders'

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
