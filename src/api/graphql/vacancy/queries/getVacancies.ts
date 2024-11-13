import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { vacancyFragment } from '../../fragments/vacancy'

export const VACANCIES = gql`
  query vacancies($salon: ID, $brand: ID, $page: Int, $pageSize: Int) {
    vacancies(filters: {salon: {id: {eq: $salon}}, brand: {id: {eq: $brand}}}, pagination: { pageSize: $pageSize, page: $page }) {
      ${vacancyFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
