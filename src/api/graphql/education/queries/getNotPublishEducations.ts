import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { educationFragment } from '../fragments/educationFragment'

export const NOT_PUBLISH_EDUCATIONS = gql`
  query educations($master: ID, $salon: ID, $brand: ID, $page: Int, $pageSize: Int) {
    educations(pagination: {pageSize: $pageSize, page: $page},publicationState: PREVIEW, filters: { and: [{ publishedAt: {null: true}},{ deleted: {eq: false}},{ salon: { id: { eq: $salon }}}, {master: { id: { eq: $master }}}, { brand: { id: { eq: $brand }}}]}) {
      ${educationFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
