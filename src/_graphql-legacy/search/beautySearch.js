import { gql } from "@apollo/client";

export const beautySearch = gql`
  query bSearch($query: String, $cursor: String = null) {
    pagesSearch(query: $query) {
      filterDefinition
      connection(first: 18, after: $cursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          desc
          photoId
          categoryId
        }
      }
    }
  }
`;
