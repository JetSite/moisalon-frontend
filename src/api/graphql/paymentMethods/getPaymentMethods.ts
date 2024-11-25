import { gql } from '@apollo/client'
import { paymentMethodsFragment } from '../fragments/paymentMethods'

export const PAYMENT_METHODS = gql`
  query paymentMethods {
    paymentMethods {
      ${paymentMethodsFragment}
    }
  }
`
