import { gql } from "@apollo/client";

export const createBrandMutation = gql`
  mutation createBrandMutation($input: CreateBrandInput!) {
    createBrand(input: $input) {
      id
    }
  }
`;
