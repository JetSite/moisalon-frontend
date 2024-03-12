import { gql } from "@apollo/client";

export const removeItemB2cMutation = gql`
  mutation AddToCUpdateItemQuantities($input: UpdateToCartInput!) {
    updateItemQuantities(input: $input) {
      id
      total
      shippingTotal
      contents {
        key
        productId
        quantity
      }
    }
  }
`;
