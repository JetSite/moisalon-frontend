import { gql } from "@apollo/client";

export const addToCartMutation = gql`
  mutation ATC($productId: Int!, $quantity: Int) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      cart {
        subtotal
      }
    }
  }
`;
