import { gql } from "@apollo/client";
import { masterRentalRequestListPhotoFragment } from "./masterRentalRequestListPhotoFragment";
import { salonRentalRequestListLogoFragment } from "./salonRentalRequestListLogoFragment";
import { seatRentalRequestListPhotoFragment } from "./seatRentalRequestListPhotoFragment";

export const rentalRequestFragment = gql`
  fragment RentalRequestFragment on RentalRequest {
    status
    master {
      id
      name
      specializations
      ...MasterRentalRequestListPhotoFragment
    }
    salon {
      id
      name
      ...SalonRentalRequestListLogoFragment
    }
    roomId
    seat {
      id
      seatNumber
      activities
      ...SeatRentalRequestListPhotoFragment
    }
  }
  ${masterRentalRequestListPhotoFragment}
  ${salonRentalRequestListLogoFragment}
  ${seatRentalRequestListPhotoFragment}
`;
