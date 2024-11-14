import { gql } from '@apollo/client'
import { vacancyFragment } from '../../fragments/vacancy'

export const UPDATE_VACANCY = gql`
  mutation updateVacancy($id: ID!, $input: VacancyInput!) {
    updateVacancy(id: $id, data: $input) {
      ${vacancyFragment}
    }
  }
`
