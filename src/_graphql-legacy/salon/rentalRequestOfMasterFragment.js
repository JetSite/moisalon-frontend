import { gql } from "@apollo/client";

export const rentalRequestOfMasterFragment = gql`
  fragment RentalRequestOfMasterFragment on Seat {
    rentalRequest: rentalRequestOfMaster {
      id
    }
  }
`;
