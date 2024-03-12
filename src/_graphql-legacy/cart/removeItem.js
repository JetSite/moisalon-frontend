import { gql } from "@apollo/client";

export const removeItemMutation = gql`
  mutation DTC($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      cart {
        subtotal
      }
    }
  }
`;
