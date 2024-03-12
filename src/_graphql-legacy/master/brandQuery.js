import { gql } from "@apollo/client";

export const brandQuery = gql`
  query brandQuery($id: ID!) {
    brandsMaster(masterId: $id) {
      id
      logoId
      seo {
        slug
      }
      addressFull {
        city
      }
      photo(kind: "medium") {
        id
        kind
        url
      }
      name
    }
  }
`;
