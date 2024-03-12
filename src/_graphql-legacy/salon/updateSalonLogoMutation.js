import { gql } from "@apollo/client";
import { salonLogoFragment } from "./salonLogoFragment";

export const updateSalonLogoMutation = gql`
  mutation updateSalonLogoMutation($input: UpdateSalonLogoInput!) {
    updateSalonLogo(input: $input) {
      ...SalonLogoFragment
    }
  }
  ${salonLogoFragment}
`;
