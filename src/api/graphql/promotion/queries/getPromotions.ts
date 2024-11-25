import { gql } from '@apollo/client'
import { promotionFragment } from '../fragments/PromotionFragment'
import { metaInfo } from 'src/api/graphql/common/metaInfo'

export const PROMOTIONS = gql`
  query promotions($pageSize: Int) {
    promotions(pagination: { pageSize: $pageSize }) {
      ${promotionFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
