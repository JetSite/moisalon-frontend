import { gql } from "@apollo/client";

export const updateServiceMasterMutation = gql`
  mutation updateServiceMasterMutation($input: UpdateServicesMasterInput!) {
    updateServicesMaster(input: $input) {
      servicesMaster {
        id
        price
      }
    }
  }
`;
