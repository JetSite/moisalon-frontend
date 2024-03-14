import { gql } from "@apollo/client";

export const getMe = gql`
  query me {
    me {
      id
      username
      email
      confirmed
      blocked
    }
  }
`;
