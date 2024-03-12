import { gql } from "@apollo/client";

export const mastersSalon = gql`
  query SalonMasters($salonId: ID!) {
    salonMasters(salonId: $salonId) {
      id
      name
      specializations
      averageScore
      numberScore
      rating
      seo {
        slug
      }
      photo(kind: "medium") {
        id
        kind
        url
      }
    }
  }
`;
