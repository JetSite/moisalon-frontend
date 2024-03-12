import { gql } from "@apollo/client";

export const createScopesBrand = gql`
  mutation createScopesBrand($value: Float!, $brandId: ID!) {
    createScopesBrand(value: $value, brandId: $brandId)
  }
`;
