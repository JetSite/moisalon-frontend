import { gql } from '@apollo/client'
import { promotionFragment } from '../fragments/PromotionFragment'

export const PROMOTION_BY_ID = gql`
  query promotion($id: ID!) {
    promotion(id: $id) {
      ${promotionFragment}
    }
  }
`
