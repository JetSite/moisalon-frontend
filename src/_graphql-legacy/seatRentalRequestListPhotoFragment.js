import { gql } from "@apollo/client";

export const seatRentalRequestListPhotoFragment = gql`
  fragment SeatRentalRequestListPhotoFragment on Seat {
    rentalRequestListPhoto: photo(kind: "medium") {
      id
      kind
      url
    }
  }
`;
