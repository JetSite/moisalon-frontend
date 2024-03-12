import { gql } from "@apollo/client";

export const brandsSalon = gql`
  query brandsSalon($id: ID!) {
    brandsSalon(salonId: $id) {
      id
      logoId
      seo {
        slug
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
