import { gql } from "@apollo/client";

export const eventsSearch = gql`
  query Search($query: String, $cursor: String = null) {
    eventsSearch(query: $query) {
      filterDefinition
      connection(first: 6, after: $cursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          desc
          dateStart
          dateEnd
          photoId
          originId
          origin
          masterOrigin {
            name
          }
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
