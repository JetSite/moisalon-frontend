import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { eventFragment } from '../fragments/eventFragment'

/**
 * Fetches unpublished education records for a specific salon and brand
 * @param salon - Salon ID to filter by
 * @param brand - Brand ID to filter by
 * @param master - Master ID to filter by
 * @param page - Page number for pagination
 * @param pageSize - Number of items per page
 */

export const NOT_PUBLISH_EVENTS = gql`
  query NotPublishEvents($master: ID, $salon: ID, $brand: ID, $page: Int, $pageSize: Int) {
    events(pagination: {pageSize: $pageSize, page: $page},publicationState: PREVIEW, filters: { and: [{ publishedAt: {null: true}},{ deleted: {eq: false}},{ salon: { id: { eq: $salon }}}, {master: { id: { eq: $master }}}, { brand: { id: { eq: $brand }}}]}) {
      ${eventFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
