import { gql } from "@apollo/client";

export const workplacesRoomDefaultPhotoFragment = gql`
  fragment WorkplacesRoomDefaultPhotoFragment on Room {
    defaultPhoto(kind: "medium") {
      id
      kind
      url
    }
  }
`;
