import { gql } from "@apollo/client";

export const updateSalonServicesMutation = gql`
  mutation updateSalonServicesMutation(
    $salonId: ID!
    $input: UpdateSalonServicesInput!
  ) {
    updateSalonServices(salonId: $salonId, input: $input) {
      id
      value
    }
  }
`;
