import { gql } from "@apollo/client";
import { masterPersonalInformationFragment } from "./masterPersonalInformationFragment";

export const updateMasterPersonalInformationMutation = gql`
  mutation updateMasterProfileMutation($input: UpdateMasterProfileInput!) {
    updateMasterProfile(input: $input) {
      id
      address
      addressFull {
        full
        latitude
        longitude
        office
        city
      }
      ...MasterPersonalInformationFragment
    }
  }
  ${masterPersonalInformationFragment}
`;
