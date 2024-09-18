import { gql } from '@apollo/client'
import { salonWorkplacesFragment } from '../fragments/salonWorkplaces'

export const UPDATE_WORKPLACE = gql`
  mutation updateSalonWorkplace($workplaceId: ID!, $input: SalonWorkplaceInput!) {
    updateSalonWorkplace(id: $workplaceId, data: $input) {
      ${salonWorkplacesFragment}
    }
  }
`
