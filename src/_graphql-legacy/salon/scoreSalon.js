import { gql } from "@apollo/client";

export const scoreSalon = gql`
  query scoreSalon($id: ID!) {
    scoreSalon(id: $id) {
      value
    }
  }
`;
