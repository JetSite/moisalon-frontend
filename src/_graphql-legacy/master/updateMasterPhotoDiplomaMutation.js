import { gql } from "@apollo/client";

export const updateMasterPhotoDiplomaMutation = gql`
  mutation updateMasterPhotoDiplomaMutation(
    $input: UpdateMasterPhotoDiplomaInput!
  ) {
    updateMasterPhotoDiploma(input: $input) {
      id
    }
  }
`;
