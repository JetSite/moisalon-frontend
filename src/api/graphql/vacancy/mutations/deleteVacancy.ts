import { gql } from '@apollo/client'

export const DELETE_VACANCY = gql`
  mutation deleteVacancy($id: ID!) {
    updateVacancy(id: $id, data: { publishedAt: null }) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`
