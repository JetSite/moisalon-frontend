import { gql } from '@apollo/client'

export const getCities = gql`
  query cities($cityName: [String], $itemsCount: Int!) {
    cities(
      filters: { cityName: { in: $cityName } }
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
