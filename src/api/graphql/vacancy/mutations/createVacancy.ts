import { gql } from '@apollo/client'
import { vacancyFragment } from '../../fragments/vacancy'

export const CREATE_VACANCY = gql`
  mutation createVacancy($input: VacancyInput!) {
    createVacancy(data: $input) {
      ${vacancyFragment}
    }
  }
`
