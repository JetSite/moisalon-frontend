import { gql } from '@apollo/client'

export const DELETE_VACANCY = gql`
  mutation deleteVacancy($id: ID!) {
    deleteVacancy(id: $id) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`