import { gql } from "@apollo/client";

export const getOrderPayLink = gql`
  mutation GetOrderPayLink($orderId: String!) {
    orderPayLink(orderId: $orderId)
  }
`;
