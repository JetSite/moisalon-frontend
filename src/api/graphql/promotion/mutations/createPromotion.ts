import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import { promotionFragment } from '../../fragments/promotion'

export const CREATE_PROMOTION = gql`
  mutation createPromotion($input: PromotionInput!) {
    createPromotion(data: $input) {
      ${promotionFragment}
    }
  }
`
