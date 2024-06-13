import { gql } from '@apollo/client'

export const CREATE_CITY = gql`
  mutation createCity($name: String!, $slug: String!) {
    createCity(data: { name: $name, slug: $slug }) {
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
