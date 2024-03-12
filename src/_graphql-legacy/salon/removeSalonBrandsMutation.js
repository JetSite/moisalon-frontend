import { gql } from "@apollo/client";

export const removeSalonBrandsMutation = gql`
  mutation ($ids: [ID]!, $salonId: ID!) {
    removeSalonBrands(ids: $ids, salonId: $salonId)
  }
`;