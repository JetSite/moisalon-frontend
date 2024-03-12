import { gql } from "@apollo/client";

export const seatPhotoOverviewFragment = gql`
  fragment SeatPhotoOverviewFragment on Seat {
    overviewPhoto: photo(kind: "medium") {
      id
      kind
      url
    }
  }
`;