import { gql } from "@apollo/client";

export const getAdvices = gql`
  query PagesCategory($catId: String!) {
    pagesCategory(catId: $catId) {
      id
      title
      desc
      short_desc
      categoryId
      photoId
    }
  }
`;
