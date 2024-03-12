import { gql } from "@apollo/client";
import { salonSearchResultFragment } from "./salonSearchResultFragment";

export const searchQuery = gql`
  query SearchQuery($input: WorkplacesSearchInput!, $cursor: String = null) {
    salonSearch(input: $input) {
      filterDefinition
      salonsConnection(first: 12, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ...SalonSearchResultFragment
        }
        totalCount
      }
    }
  }
  ${salonSearchResultFragment}
`;
