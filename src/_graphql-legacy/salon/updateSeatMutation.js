import { gql } from "@apollo/client";
import { seatEditorSeatFragment } from "./seatEditorSeatFragment";
import { seatPhotoEditorFragment } from "./seatPhotoEditorFragment";
import { workplacesSeatFragment } from "./workplacesSeatFragment";
import { salonSeatsCountFragment } from "./salonSeatsCountFragment";

export const updateSeatMutation = gql`
  mutation UpdateSeatMutation(
    $salonId: ID!
    $roomId: ID!
    $seatId: ID!
    $input: CreateOrUpdateSalonRoomSeatInput!
  ) {
    updateSalonRoomSeat(
      salonId: $salonId
      roomId: $roomId
      seatId: $seatId
      input: $input
    ) {
      id
      ...SeatEditorSeatFragment
      ...SeatPhotoEditorFragment
      ...WorkplacesSeatFragment
      salon {
        id
        ...SalonSeatsCountFragment
      }
    }
  }
  ${seatPhotoEditorFragment}
  ${seatEditorSeatFragment}
  ${workplacesSeatFragment}
  ${salonSeatsCountFragment}
`;
