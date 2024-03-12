import { gql } from "@apollo/client";

export const salonPhotosFragment = gql`
  fragment SalonPhotosFragment on Salon {
    photos(kind: "medium") {
      id
      kind
      url
    }
  }
`;
