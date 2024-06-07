import { gql } from '@apollo/client'

export const CREATE_SALON = gql`
  mutation createSalon($input: SalonInput!) {
    createSalon(data: $input) {
      data {
        id
        attributes {
          salonName
        }
      }
    }
  }
`
