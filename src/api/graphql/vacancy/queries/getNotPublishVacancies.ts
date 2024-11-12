import { gql } from '@apollo/client'
import { metaInfo } from 'src/api/graphql/common/metaInfo'
import { vacanciesFragment } from '../../me/fragments/vacancies'

export const NOT_PUBLISH_VACANCIES = gql`
  query ( $salon: ID, $brand: ID, $page: Int, $pageSize: Int) {
  vacancies(pagination: {pageSize: $pageSize, page: $page},publicationState: PREVIEW, filters: { and: [{ publishedAt: {null: true}},{ deleted: {eq: false}},{ salon: { id: { eq: $salon }}}, { brand: { id: { eq: $brand }}}]}) {
      ${vacanciesFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
