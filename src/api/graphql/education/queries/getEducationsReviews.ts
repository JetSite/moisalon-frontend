import { gql } from '@apollo/client'
import { reviewsFragment } from '../../fragments/reviews'

export const GET_EDUCATION_REVIEWS = gql`
  query education($id: ID!) {
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
