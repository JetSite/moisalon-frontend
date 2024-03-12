import { gql } from "@apollo/client";

export const deletePriorityMutation = gql`
  mutation deletedRequestPriority($id: String!) {
    deletedRequestPriority(id: $id) {
      id
    }
  }
`;
