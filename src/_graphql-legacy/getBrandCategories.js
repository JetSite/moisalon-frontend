import { gql } from "@apollo/client";

export const getBrandCategories = gql`
  query BrandCategories {
    brandCategories {
      id
      title
    }
  }
`;
