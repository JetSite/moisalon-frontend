import { gql } from '@apollo/client'
import { reviewsFragment } from '../../fragments/reviews'

/**
 * Fetches unpublished education records for a specific salon and brand
 * @param salon - Salon ID to filter by
 * @param brand - Brand ID to filter by
 * @param page - Page number for pagination
 * @param pageSize - Number of items per page
 */

export const GET_EDUCATION_REVIEWS = gql`
  query NotPublishEducations($id: ID!) {
    education(id: $id) {
      data {
        id
        attributes {
          reviews {
            ${reviewsFragment}
          }
        }
      }
    }
  }
`
