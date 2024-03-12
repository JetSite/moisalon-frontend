import { gql } from "@apollo/client";
import { salonSeatsCountFragment } from "./salonSeatsCountFragment";

export const deleteSeatMutation = gql`
  mutation DeleteSeatMutation($salonId: ID!, $roomId: ID!, $seatId: ID!) {
    deleteSalonRoomSeat(salonId: $salonId, roomId: $roomId, seatId: $seatId) {
      salon {
        id
        ...SalonSeatsCountFragment
      }
    }
  }
  ${salonSeatsCountFragment}
`;
