import { gql } from "@apollo/client";

export const masterRentalRequestListPhotoFragment = gql`
  fragment MasterRentalRequestListPhotoFragment on Master {
    rentalRequestListPhoto: photo(kind: "medium") {
      id
      kind
      url
    }
  }
`;
