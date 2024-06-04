import { gql } from '@apollo/client'

export const CREATE_CITY = gql`
  mutation createCity($name: String!, $slug: String!) {
    createCity(data: { cityName: $name, citySlug: $slug }) {
      data {
        id
        attributes {
          cityName
        }
      }
    }
  }
`
