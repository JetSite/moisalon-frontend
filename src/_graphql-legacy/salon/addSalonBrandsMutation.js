import { gql } from "@apollo/client";

export const addSalonBrandsMutation = gql`
  mutation ($ids: [ID]!, $salonId: ID!) {
    addSalonBrands(ids: $ids, salonId: $salonId)
  }
`;
