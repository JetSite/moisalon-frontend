import { gql } from "@apollo/client";

export const sendOrderBrandMutation = gql`
  mutation SendOrderBrandMutation($input: SendOrderBrandInput!) {
    sendOrderBrand(input: $input)
  }
`;