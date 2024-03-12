import { gql } from "@apollo/client";

export const createReviewMutation = gql`
  mutation createReviewMutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      description
      name
      createAt
    }
  }
`;
