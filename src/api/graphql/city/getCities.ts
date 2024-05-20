import { gql } from '@apollo/client'

export const getCities = gql`
  query cities($citySlug: [String], $itemsCount: Int) {
    cities(
      filters: { citySlug: { in: $citySlug } }
      pagination: { page: 1, pageSize: $itemsCount }
    ) {
      data {
        id
        attributes {
          cityName
          citySlug
        }
      }
    }
  }
`
