import { gql } from "@apollo/client";

export const createMessage = gql`
  mutation ($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
    }
  }
`;
