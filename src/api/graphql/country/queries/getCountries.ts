import { gql } from '@apollo/client'

export const COUNTRIES = gql`
  query countries($slug: [String], $itemsCount: Int) {
    countries(
      filters: { slug: { in: $slug } }
      pagination: { page: 1, pageSize: $itemsCount }
    ) {
      data {
        id
        attributes {
          name
          slug
        }
      }
    }
  }
`
