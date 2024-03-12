import { gql } from "@apollo/client";

export const getRooms = gql`
  query Rooms {
    rooms {
      id
      userId
      user {
        avatar
        displayName
      }
      origin
      originId
      noReads
    }
  }
`;
