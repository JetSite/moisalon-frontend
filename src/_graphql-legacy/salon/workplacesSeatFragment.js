import { gql } from "@apollo/client";
import { seatPhotoOverviewFragment } from "./seatPhotoOverviewFragment";

export const workplacesSeatFragment = gql`
  fragment WorkplacesSeatFragment on Seat {
    seatNumber
    isAvailableForRent
    ...SeatPhotoOverviewFragment
    activities
    rentalPricing {
      hour
      day
      week
      month
      year
    }
  }
  ${seatPhotoOverviewFragment}
`;
