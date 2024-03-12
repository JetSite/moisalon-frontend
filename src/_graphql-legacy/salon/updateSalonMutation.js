import { gql } from "@apollo/client";
import { salonGeneralInformationFragment } from "./salonGeneralInformationFragment";
import { salonIdentityFragment } from "./salonIdentityFragment";

export const updateSalonMutation = gql`
  mutation updateSalonInformationMutation(
    $input: UpdateSalonInformationInput!
  ) {
    updateSalonInformation(input: $input) {
      id
      name
      address {
        full
      }
      ...SalonGeneralInformationFragment
    }
  }
  ${salonGeneralInformationFragment}
`;
