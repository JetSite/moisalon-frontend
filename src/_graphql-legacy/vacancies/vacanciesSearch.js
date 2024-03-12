import { gql } from "@apollo/client";

export const vacanciesSearch = gql`
  query Search($query: String, $cursor: String = null) {
    vacanciesSearch(query: $query) {
      filterDefinition
      connection(first: 10, after: $cursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          desc
          short_desc
          amountFrom
          amountTo
          originId
          origin
          photoId
          salonOrigin {
            name
          }
          brandOrigin {
            name
          }
        }
      }
    }
  }
`;
