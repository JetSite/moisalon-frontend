import { gql } from "@apollo/client";

export const createEventMutation = gql`
  mutation ($input: CreateRequestEventsInput!) {
    createRequestEvents(input: $input) {
      id
      title
    }
  }
`;
