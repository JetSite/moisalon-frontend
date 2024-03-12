import { gql } from "@apollo/client";

export const getProductCategories = gql`
  query ProductsCatagories {
    productsCatagoriesB2b {
      id
      title
      parentId
    }
  }
`;
