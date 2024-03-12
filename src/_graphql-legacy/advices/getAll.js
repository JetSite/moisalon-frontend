import { gql } from "@apollo/client";

export const getAll = gql`
  query Pages {
    pages {
      id
      title
      desc
      short_desc
      categoryId
      photoId
    }
  }
`;
