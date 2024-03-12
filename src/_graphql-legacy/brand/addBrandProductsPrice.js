import { gql } from "@apollo/client";

export const addBrandProductsPriceMutation = gql`
  mutation addBrandProductsPrice($input: AddBrandProductsPriceInput!) {
    addBrandProductsPrice(input: $input) {
      id
    }
  }
`;
