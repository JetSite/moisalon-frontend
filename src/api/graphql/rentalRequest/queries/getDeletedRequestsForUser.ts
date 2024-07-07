import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { rentalRequstFragment } from '../../fragments/rentalRequst'

export const DELETED_RENTAL_REQUESTS_FOR_USER = gql`
  query rentalRequests($id: ID) {
    rentalRequests(publicationState: PREVIEW, filters: { and: [{ publishedAt: {null: true}},{ user: {id: {eq: $id}}}]}) {
      ${rentalRequstFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
