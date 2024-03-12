import { gql } from "@apollo/client";

export const createScopesSalon = gql`
  mutation createScopesSalon($value: Float!, $salonId: ID!) {
    createScopesSalon(value: $value, salonId: $salonId)
  }
`;
