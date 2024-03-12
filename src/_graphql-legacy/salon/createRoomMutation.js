import { gql } from "@apollo/client";
import { workplacesRoomFragment } from "./workplacesRoomFragment";

export const createRoomMutation = gql`
  mutation createRoomMutation($salonId: ID!, $input: CreateOrUpdateSalonRoomInput!) {
    createSalonRoom(salonId: $salonId, input: $input) {
      id
      ...WorkplacesRoomFragment
    }
  }
  ${workplacesRoomFragment}
`;
