import { gql } from "@apollo/client";
import { masterPhotoFragment } from "./masterPhotoFragment";

export const masterIdentityFragment = gql`
  fragment MasterIdentityFragment on Master {
    name
    specializations
    addressFull {
      full
      latitude
      longitude
      office
      city
    }
    userId
    ...MasterPhotoFragment
  }
  ${masterPhotoFragment}
`;
