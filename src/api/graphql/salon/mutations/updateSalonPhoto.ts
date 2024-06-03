import { gql } from '@apollo/client'

export const UPDATE_SALON_PHOTO = gql`
  mutation updateSalon($input: MasterSalon!) {
    updateSalonPhoto(input: $input) {
      data {
        attributes {
          photo
        }
      }
    }
  }
`
