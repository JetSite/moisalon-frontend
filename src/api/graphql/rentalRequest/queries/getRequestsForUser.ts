import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { rentalRequstFragment } from '../../fragments/rentalRequst'

export const RENTAL_REQUESTS_FOR_USER = gql`
  query rentalRequests($id: ID) {
    rentalRequests(filters: { user: { id: { eq: $id } } }) {
      ${rentalRequstFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
