import { gql } from '@apollo/client'
import { saleFragment } from '../fragments/saleFragment'
import { metaInfo } from 'src/api/graphql/common/metaInfo'

export const getSales = gql`
  query promotions {
    promotions(pagination: { pageSize: 100 }) {
      ${saleFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
