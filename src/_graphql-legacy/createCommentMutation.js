import { gql } from "@apollo/client";

export const createCommentMutation = gql`
  mutation createCommentMutation($input: CreateCommentsInput!) {
    createComments(input: $input) {
      id
    }
  }
`;
