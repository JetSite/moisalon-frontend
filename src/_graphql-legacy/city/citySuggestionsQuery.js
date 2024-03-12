import { gql } from "@apollo/client";

export const citySuggestionsQuery = gql`
  query citySuggestionsQuery($city: String!, $count: Int = 10) {
    citySuggestions(count: $count, query: $city) {
      data {
        city
        settlement
      }
    }
  }
`;
