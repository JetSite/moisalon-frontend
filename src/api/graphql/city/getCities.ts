import { gql } from '@apollo/client'

export const getCities = gql`
  query cities($slug: [String], $itemsCount: Int) {
    cities(
      sort: "name:asc"
      filters: { slug: { in: $slug } }
      pagination: { page: 1, pageSize: $itemsCount }
    ) {
      data {
        id
        attributes {
          name
          slug
          latitude
          longitude
        }
      }
    }
  }
`
