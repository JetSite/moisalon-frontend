import { gql } from "@apollo/client";

export const createScopesMaster = gql`
  mutation createScopesMaster($value: Float!, $masterId: ID!) {
    createScopesMaster(value: $value, masterId: $masterId)
  }
`;
