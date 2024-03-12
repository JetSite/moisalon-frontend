import { gql } from "@apollo/client";
import { workplacesSeatFragment } from "./workplacesSeatFragment";
import { workplacesRoomDefaultPhotoFragment } from "./workplacesRoomDefaultPhotoFragment";

export const workplacesRoomFragment = gql`
  fragment WorkplacesRoomFragment on Room {
    defaultPhotoId
    hasWindows
    id
    photoIds
    description
    floor
    space
    title
    wetPointsHands
    wetPointsHead
    wetPointsShower
    seatCount
    ...WorkplacesRoomDefaultPhotoFragment
    seats {
      id
      ...WorkplacesSeatFragment
    }
    services {
      id
      value
    }
  }
  ${workplacesRoomDefaultPhotoFragment}
  ${workplacesSeatFragment}
`;
