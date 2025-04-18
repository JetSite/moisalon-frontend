import { gql } from '@apollo/client';

export const getSearchCity = gql`
  query cities($name: String) {
    cities(sort: "order:desc", filters: { name: { containsi: $name } }) {
      data {
        id
        attributes {
          name
          slug
        }
      }
    }
  }
`;
