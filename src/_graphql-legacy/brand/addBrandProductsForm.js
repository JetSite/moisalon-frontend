import { gql } from "@apollo/client";

export const addBrandProductsFormMutation = gql`
  mutation addBrandProductsForm($input: AddBrandProductsFormInput!) {
    addBrandProductsForm(input: $input) {
      id
    }
  }
`;
