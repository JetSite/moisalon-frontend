import { gql } from "@apollo/client";

export const addUserBrandsMutation = gql`
  mutation ($ids: [ID]!, $masterId: ID!) {
    addUserBrands(ids: $ids, masterId: $masterId)
  }
`;
