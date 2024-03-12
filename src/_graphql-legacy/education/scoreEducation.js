import { gql } from "@apollo/client";

export const scoreEducation = gql`
  query scoreEducation($id: ID!) {
    scoreEducation(id: $id) {
      value
    }
  }
`;
