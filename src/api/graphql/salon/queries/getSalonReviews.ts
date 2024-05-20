import { gql } from '@apollo/client'
import { reviewsFragment } from '../../fragments/reviews'

export const GET_SALON_REVIEWS = gql`
  query salon($id: ID!) {
    salon(id: $id) {
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
