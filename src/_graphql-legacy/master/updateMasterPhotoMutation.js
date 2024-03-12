import { gql } from "@apollo/client";
import { masterPhotoFragment } from "./masterPhotoFragment";

export const updateMasterPhotoMutation = gql`
  mutation updateMasterPhotoMutation($input: UpdateMasterPhotoInput!) {
    updateMasterPhoto(input: $input) {
      id
      ...MasterPhotoFragment
    }
  }
  ${masterPhotoFragment}
`;
