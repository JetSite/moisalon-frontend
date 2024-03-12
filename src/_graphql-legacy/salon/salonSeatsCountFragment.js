import { gql } from "@apollo/client";

export const salonSeatsCountFragment = gql`
  fragment SalonSeatsCountFragment on Salon {
    seatsCount {
      availableForRent
      total
    }
  }
`;
