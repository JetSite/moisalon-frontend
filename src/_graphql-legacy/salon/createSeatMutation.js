import { gql } from "@apollo/client";
import { workplacesSeatFragment } from "./workplacesSeatFragment";
import { salonSeatsCountFragment } from "./salonSeatsCountFragment";

export const createSeatMutation = gql`
  mutation CreateSeatMutation(
    $salonId: ID!
    $roomId: ID!
    $input: CreateOrUpdateSalonRoomSeatInput!
  ) {
    createSalonRoomSeat(salonId: $salonId, roomId: $roomId, input: $input) {
      id
      ...WorkplacesSeatFragment
      salon {
        id
        ...SalonSeatsCountFragment
      }
    }
  }
  ${workplacesSeatFragment}
  ${salonSeatsCountFragment}
`;
