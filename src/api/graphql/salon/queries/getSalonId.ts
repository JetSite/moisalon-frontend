import { gql } from '@apollo/client'

export const getSalonId = gql`
  query Salons($slug: String) {
    salons(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          slug
        }
      }
    }
  }
`
