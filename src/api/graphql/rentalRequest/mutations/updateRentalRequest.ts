import { gql } from '@apollo/client'
import { rentalRequstFragment } from '../../fragments/rentalRequst'

export const UPDATE_RENTAL_REQUEST = gql`
  mutation updateRentalRequest($requestID: ID!, $input: RentalRequestInput!) {
    updateRentalRequest(id: $requestID, data: $input) {
    ${rentalRequstFragment}
    }
  }
`
