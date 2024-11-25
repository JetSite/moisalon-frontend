import { gql } from '@apollo/client'
import { metaInfo } from 'src/api/graphql/common/metaInfo'
import { promotionFragment } from '../fragments/PromotionFragment'

/**
 * Fetches unpublished promotions records for a specific salon and brand
 * @param salon - Salon ID to filter by
 * @param brand - Brand ID to filter by
 * @param master - Master ID to filter by
 * @param page - Page number for pagination
 * @param pageSize - Number of items per page
 */

export const NOT_PUBLISH_PROMOTIONS = gql`
  query ($master: ID, $salon: ID, $brand: ID, $page: Int) {
  promotions(pagination: {pageSize: 2, page: $page},publicationState: PREVIEW, filters: { and: [{ publishedAt: {null: true}},{ deleted: {eq: false}}, { master: { id: { eq: $master }}},{ salon: { id: { eq: $salon }}}, { brand: { id: { eq: $brand }}}]}) {
      ${promotionFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
