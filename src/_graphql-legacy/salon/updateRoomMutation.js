import { gql } from "@apollo/client";
import { workplacesRoomFragment } from "./workplacesRoomFragment";

export const updateRoomMutation = gql`
  mutation updateRoomMutation(
    $salonId: ID!
    $roomId: ID!
    $input: CreateOrUpdateSalonRoomInput!
  ) {
    updateSalonRoom(input: $input, roomId: $roomId, salonId: $salonId) {
      id
      ...WorkplacesRoomFragment
    }
  }
  ${workplacesRoomFragment}
`;
