import { gql } from "@apollo/client";

export const masterSearchAllQuery = gql`
  query mastersSearch($input: MasterSearchInput!, $cursor: String = null) {
    masterSearch(input: $input) {
      connection(first: 10000000, after: $cursor) {
        nodes {
          addressFull {
            city
          }
          id
          seo {
            slug
          }
        }
      }
    }
  }
`;
