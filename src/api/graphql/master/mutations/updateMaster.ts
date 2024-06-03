import { gql } from '@apollo/client'

export const UPDATE_MASTER = gql`
  mutation updateMaster($masteriId: ID!, $input: MasterInput!) {
    updateMaster(id: $masterId, data: $input) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`
