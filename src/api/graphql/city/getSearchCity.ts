import { gql } from '@apollo/client'

export const getSearchCity = gql`
  query cities($cityName: String) {
    cities(filters: { cityName: { containsi: $cityName } }) {
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
