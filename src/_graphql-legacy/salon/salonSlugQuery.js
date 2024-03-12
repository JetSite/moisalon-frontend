import { gql } from "@apollo/client";

export const salonSlugQuery = gql`
  query salonSlugQuery($slug: String) {
    salonSlug(slug: $slug) {
      id
    }
  }
`;