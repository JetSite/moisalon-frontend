import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { rentalRequstFragment } from '../../fragments/rentalRequst'

export const DELETED_RENTAL_REQUESTS_FOR_SALON = gql`
  query rentalRequests($salonsID: [ID]) {
    rentalRequests(publicationState: PREVIEW, filters: { and: [{ publishedAt: {null: true}}, { salon: { id: { in: $salonsID }}}]}) {
      ${rentalRequstFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
