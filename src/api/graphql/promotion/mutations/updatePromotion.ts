import { gql } from '@apollo/client'
import { promotionFragment } from '../../fragments/promotion'

export const UPDATE_PROMOTION = gql`
  mutation updatePromotion($id: ID!, $input: PromotionInput!) {
    updatePromotion(id: $id, data: $input) {
      ${promotionFragment}
    }
  }
`
