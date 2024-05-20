import { gql } from '@apollo/client'
import { reviewsFragment } from '../../fragments/reviews'

export const GET_BRAND_REVIEWS = gql`
  query brand($id: ID!) {
    brand(id: $id) {
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
