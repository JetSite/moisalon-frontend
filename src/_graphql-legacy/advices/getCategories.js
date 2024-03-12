import { gql } from "@apollo/client";

export const getCategories = gql`
  query GetCat {
    catagories {
      id
      title
    }
  }
`;
