import { gql } from "@apollo/client";

export const createPriorityMutation = gql`
  mutation createRequestPriority($input: CreateRequestPriorityInput!) {
    createRequestPriority(input: $input) {
      id
    }
  }
`;
