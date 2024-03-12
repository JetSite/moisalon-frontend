import { gql } from "@apollo/client";

export const productsCatagories = gql`
  query ProductsCatagories {
    productsCatagories {
      id
      title
      parentId
    }
  }
`;
