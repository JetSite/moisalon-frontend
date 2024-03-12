import { gql } from "@apollo/client";

export const updateMasterPhotoWorksMutation = gql`
  mutation updateMasterPhotoWorksMutation(
    $input: UpdateMasterPhotoWorksInput!
  ) {
    updateMasterPhotoWorks(input: $input) {
      id
    }
  }
`;
