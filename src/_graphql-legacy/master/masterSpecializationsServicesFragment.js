import { gql } from "@apollo/client";

export const masterSpecializationsServicesFragment = gql`
  fragment MasterSpecializationsServicesFragment on Master {
    specializationsServices
  }
`;
