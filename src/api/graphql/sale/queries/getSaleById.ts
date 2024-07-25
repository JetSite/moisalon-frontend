import { gql } from '@apollo/client'
import { saleFragment } from '../fragments/saleFragment'

export const getSaleById = gql`
  query promotion($id: ID!) {
    promotion(id: $id) {
      ${saleFragment}
    }
  }
`
