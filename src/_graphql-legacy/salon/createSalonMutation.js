import { gql } from "@apollo/client";
import { salonGeneralInformationFragment } from "./salonGeneralInformationFragment";

export const createSalonMutation = gql`
  mutation createSalonMutation($input: CreateSalonInput!) {
    createSalon(input: $input) {
      ...SalonGeneralInformationFragment
    }
  }
  ${salonGeneralInformationFragment}
`;
