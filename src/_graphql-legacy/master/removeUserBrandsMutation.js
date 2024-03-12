import { gql } from "@apollo/client";

export const removeUserBrandsMutation = gql`
  mutation ($ids: [ID]!, $masterId: ID!) {
    removeUserBrands(ids: $ids, masterId: $masterId)
  }
`;
