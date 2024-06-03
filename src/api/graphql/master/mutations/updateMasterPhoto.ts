import { gql } from '@apollo/client'

export const UPDATE_MASTER_PHOTO = gql`
  mutation updateMaster($input: MasterInput!) {
    updateMasterPhoto(input: $input) {
      data {
        attributes {
          photo
        }
      }
    }
  }
`
