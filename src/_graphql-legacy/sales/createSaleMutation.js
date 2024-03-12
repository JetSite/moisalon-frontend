import { gql } from "@apollo/client";

export const createSaleMutation = gql`
  mutation createSaleMutation($input: CreateRequestSalesInput!) {
    createRequestSales(input: $input) {
      id
    }
  }
`;