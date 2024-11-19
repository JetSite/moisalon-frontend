import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { educationFragment } from '../fragments/educationFragment'

/**
 * Fetches published education records for a specific salon and brand
 * @param salon - Salon ID to filter by
 * @param brand - Brand ID to filter by
 * @param page - Page number for pagination
 * @param pageSize - Number of items per page
 */

export const EDUCATIONS = gql`
  query education($master: ID, $salon: ID, $brand: ID, $page: Int, $pageSize: Int) {
    educations(filters: {salon: {id: {eq: $salon}}, master: { id: { eq: $master }}, brand: {id: {eq: $brand}}}, pagination: { pageSize: $pageSize, page: $page }) {
      ${educationFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
