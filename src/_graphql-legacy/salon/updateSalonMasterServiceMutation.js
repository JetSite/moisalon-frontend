import { gql } from "@apollo/client";

export const updateSalonServiceMasterMutation = gql`
  mutation updateSalonServiceMasterMutation(
    $input: UpdateSalonServiceMasterInput!
  ) {
    updateSalonServiceMaster(input: $input) {
      servicesMaster {
        id
        price
      }
    }
  }
`;
