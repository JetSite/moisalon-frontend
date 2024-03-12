import { gql } from "@apollo/client";

export const scoreBrand = gql`
  query scoreBrand($id: ID!) {
    scoreBrand(id: $id) {
      value
    }
  }
`;
