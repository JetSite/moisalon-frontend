import { gql } from '@apollo/client'
import { rentalRequstFragment } from '../../fragments/rentalRequst'

export const CREATE_RENTAL_REQUEST = gql`
  mutation createRentalRequest( $input: RentalRequestInput!) {
    createRentalRequest( data: $input) {
    ${rentalRequstFragment}
    }
  }
`
