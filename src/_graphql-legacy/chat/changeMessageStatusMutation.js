import { gql } from "@apollo/client";

export const changeMessageStatusMutation = gql`
  mutation MessageSetRead($input: MessageInput!) {
    messageSetRead(input: $input) {
      id
      read
    }
  }
`;
