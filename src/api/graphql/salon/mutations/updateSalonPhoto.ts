import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'

export const UPDATE_SALON_PHOTO = gql`
  mutation updateSalon($id: ID!, $input: SalonInput!) {
    updateSalon(id: $id, data: $input) {
      data {
        attributes {
          photos{
            ${imageInfo}
          }
          logo {
            ${imageInfo}
          }
        }
      }
    }
  }
`
