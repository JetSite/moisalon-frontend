import { gql } from "@apollo/client";

export const getRoomMessages = gql`
  query Messages($roomId: String) {
    massages(roomId: $roomId) {
      id
      roomId
      userId
      authorUserId
      message
      createAt
      read
    }
  }
`;
