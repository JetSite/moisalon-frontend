import { gql } from "@apollo/client";

export const educationSearch = gql`
  query Search($query: String, $cursor: String = null) {
    educationSearch(query: $query) {
      filterDefinition
      connection(first: 6, after: $cursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          averageScore
          numberScore
          title
          amount
          dateStart
          dateEnd
          photoId
        }
      }
    }
  }
`;
