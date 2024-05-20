import { gql } from '@apollo/client'
import { reviewsFragment } from '../../fragments/reviews'

export const GET_MASTER_REVIEWS = gql`
  query master($id: ID!) {
    master(id: $id) {
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
