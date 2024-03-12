import { gql } from "@apollo/client";
import { masterSpecializationsServicesFragment } from "./masterSpecializationsServicesFragment";

export const updateMasterServicesMutation = gql`
  mutation updateMasterServicesMutation($input: UpdateMasterServicesInput!) {
    updateMasterServices(input: $input) {
      id
      ...MasterSpecializationsServicesFragment
    }
  }
  ${masterSpecializationsServicesFragment}
`;
