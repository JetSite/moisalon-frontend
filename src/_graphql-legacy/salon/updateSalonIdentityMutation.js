import { gql } from "@apollo/client";
import { salonIdentityFragment } from "./salonIdentityFragment";

export const updateSalonIdentityMutation = gql`
  mutation updateSalonIdentityMutation($input: UpdateSalonIdentityInput!) {
    updateSalonIdentity(input: $input) {
      ...SalonIdentityFragment
    }
  }
  ${salonIdentityFragment}
`;
