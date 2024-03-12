import { gql } from "@apollo/client";

export const salonDefaultPhotoFragment = gql`
  fragment SalonDefaultPhotoFragment on Salon {
    id
    defaultPhotoId
    defaultPhoto(kind: "medium") {
      id
      kind
      url
    }
  }
`;
