import { gql } from "@apollo/client";

export const hooksQuery = gql`
  query Hooks {
    hooks {
      id
      title
      code
    }
  }
`;
