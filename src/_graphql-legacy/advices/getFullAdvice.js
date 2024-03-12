import { gql } from "@apollo/client";

export const getFullAdvice = gql`
  query Pages($id: ID!) {
    page(id: $id) {
      id
      title
      desc
      short_desc
      categoryId
      createAt
      photoId
    }
  }
`;
