import { gql } from "@apollo/client";

export const addressSuggestionsQuery = gql`
  query addressSuggestionsQuery($address: String!, $count: Int = 10) {
    addressSuggestions(count: $count, query: $address) {
      data {
        geoLat
        geoLon
      }
      unrestrictedValue
    }
  }
`;
