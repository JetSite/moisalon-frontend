import { gql } from "@apollo/client";

export const scoreMaster = gql`
  query scoreMaster($id: ID!) {
    scoreMaster(id: $id) {
      value
    }
  }
`;
