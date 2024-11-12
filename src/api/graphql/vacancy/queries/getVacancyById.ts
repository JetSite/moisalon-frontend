import { gql } from '@apollo/client'
import { vacancyFragment } from '../../fragments/vacancy'

export const getVacancyById = gql`
  query vacancy($id: ID!) {
    vacancy(id: $id) {
        ${vacancyFragment}
    }
  }
`
