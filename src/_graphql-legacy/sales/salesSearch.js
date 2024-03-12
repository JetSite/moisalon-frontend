import { gql } from "@apollo/client";

export const salesSearch = gql`
  query Search($query: String, $cursor: String = null) {
    salesSearch(query: $query) {
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
            email
            phone {
              phoneNumber
            }
          }
          salonOrigin {
            name
            contactPersonEmail
            contactPersonPhone {
              phoneNumber
            }
          }
          brandOrigin {
            name
          }
        }
      }
    }
  }
`;
