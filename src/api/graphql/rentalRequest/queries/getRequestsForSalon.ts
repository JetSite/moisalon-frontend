import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { rentalRequstFragment } from '../../fragments/rentalRequst'

export const RENTAL_REQUESTS_FOR_SALON = gql`
 query RentalRequestsSalons($salonsID: [ID]) {
    rentalRequests(filters: { salon: { id: { in: $salonsID }}}) {
      ${rentalRequstFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
