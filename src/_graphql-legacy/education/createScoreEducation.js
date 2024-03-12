import { gql } from "@apollo/client";

export const createScopesEducation = gql`
  mutation createScopesEducation($value: Float!, $id: ID!) {
    createScopesEducation(value: $value, id: $id)
  }
`;
