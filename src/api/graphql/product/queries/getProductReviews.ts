import { gql } from '@apollo/client'
import { reviewsFragment } from '../../fragments/reviews'

export const GET_PRODUCT_REVIEWS = gql`
  query productReviews($filters: ReviewFiltersInput) {
    reviews(filters: $filters, pagination: { pageSize: 100 }) {
      ${reviewsFragment}
    }
  }
`
