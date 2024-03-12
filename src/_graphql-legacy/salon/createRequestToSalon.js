import { gql } from "@apollo/client";

export const createRequestToSalon = gql`
  mutation createRequestToSalon($input: CreateRequestToSalonInput!) {
    createRequestToSalon(input: $input)
  }
`;
