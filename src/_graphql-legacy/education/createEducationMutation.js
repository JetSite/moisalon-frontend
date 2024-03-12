import { gql } from "@apollo/client";

export const createEducationMutation = gql`
  mutation createEducationMutation($input: CreateRequestEducationInput!) {
    createRequestEducation(input: $input) {
      id
    }
  }
`;