import { gql } from '@apollo/client'
import { salonWorkplacesFragment } from '../fragments/salonWorkplaces'

export const CREATE_WORKPLACE = gql`
  mutation createSalonWorkplace( $input: SalonWorkplaceInput!) {
    createSalonWorkplace( data: $input) {
      ${salonWorkplacesFragment}
    }
  }
`
