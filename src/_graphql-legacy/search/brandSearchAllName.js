import { gql } from "@apollo/client";

export const brandSearchAllName = gql`
  query brandsSearch($query: String, $cursor: String = null) {
    brandsSearch(query: $query) {
      filterDefinition
      connection(first: 1000000, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }

        totalCount
        nodes {
          id
          addressFull {
            city
          }
          name
          seo {
            slug
          }
        }
      }
    }
  }
`;
