import { gql } from '@apollo/client'
import { salonWorkplacesFragment } from '../fragments/salonWorkplaces'

export const UPDATE_WORKPLACE = gql`
  mutation updateSalonWorkplace($id: ID!, $input: SalonWorkplaceInput!) {
    updateSalonWorkplace(id: $id, data: $input) {
      ${salonWorkplacesFragment}
    }
  }
`
