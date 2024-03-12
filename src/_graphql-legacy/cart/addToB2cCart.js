import { gql } from "@apollo/client";

export const addToCartB2cMutation = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
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
