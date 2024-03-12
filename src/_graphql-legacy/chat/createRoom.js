import { gql } from "@apollo/client";

export const createRoom = gql`
  mutation ($input: CreateRoomsInput!) {
    createRooms(input: $input) {
      id
    }
  }
`;
