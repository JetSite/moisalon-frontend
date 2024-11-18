import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { educationFragment } from '../fragments/educationFragment'

export const EDUCATIONS = gql`
  query educations($salon: ID, $brand: ID, $page: Int, $pageSize: Int) {
    educations(filters: {salon: {id: {eq: $salon}}, brand: {id: {eq: $brand}}}, pagination: { pageSize: $pageSize, page: $page }) {
      ${educationFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
