import { gql } from "@apollo/client";

export const totalBrands = gql`
  query totalBrands {
    totalBrands
  }
`;
