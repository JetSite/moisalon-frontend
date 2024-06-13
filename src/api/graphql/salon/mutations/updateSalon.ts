import { gql } from '@apollo/client'

export const UPDATE_SALON = gql`
  mutation updateSalon($salonId: ID!, $input: SalonInput!) {
    updateSalon(id: $salonId, data: $input) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`
