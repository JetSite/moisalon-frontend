import { gql } from "@apollo/client";

export const sendOrderOneClick = gql`
  mutation SendOrderOnClick($input: SendOrderOnClickInput!) {
    sendOrderOnClick(input: $input)
  }
`;
