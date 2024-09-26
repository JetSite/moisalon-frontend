import { gql } from '@apollo/client'
import { saleFragment } from '../fragments/saleFragment'
import { metaInfo } from 'src/api/graphql/common/metaInfo'

export const NOT_PUBLISH_SALE = gql`
  query ($master: ID, $salon: ID, $brand: ID, $page: Int) {
  promotions(pagination: {pageSize: 2, page: $page},publicationState: PREVIEW, filters: { and: [{ publishedAt: {null: true}},{ deleted: {eq: false}}, { master: { id: { eq: $master }}},{ salon: { id: { eq: $salon }}}, { brand: { id: { eq: $brand }}}]}) {
      ${saleFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
