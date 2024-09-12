import { gql } from '@apollo/client'

export const CREATE_COUNTRY = gql`
  mutation createCountry($name: String!, $slug: String!) {
    createCountry(data: { name: $name, slug: $slug }) {
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
