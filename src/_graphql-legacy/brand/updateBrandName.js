import { gql } from "@apollo/client";

export const updateBrandNameMutation = gql`
  mutation updateBrandNameMutation($input: UpdateBrandNameInput!) {
    updateBrandName(input: $input) {
      id
      name
    }
  }
`;