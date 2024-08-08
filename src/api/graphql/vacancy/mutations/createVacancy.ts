import { gql } from '@apollo/client'

export const CREATE_VACANCY = gql`
  mutation createVacancy($input: VacancyInput!) {
    createVacancy(data: $input) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`