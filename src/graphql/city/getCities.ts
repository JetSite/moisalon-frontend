import { gql } from '@apollo/client'

export const getCities = gql`
  query CityQuery($cityName: [String]) {
    cities(filters: { cityName: { in: $cityName } }) {
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
