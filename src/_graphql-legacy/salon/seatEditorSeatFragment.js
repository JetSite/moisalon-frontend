import { gql } from "@apollo/client";

export const seatEditorSeatFragment = gql`
  fragment SeatEditorSeatFragment on Seat {
    isAvailableForRent
    seatNumber
    activities
    rentalPricing {
      hour
      day
      week
      month
      year
    }
    allowJointRental
    allowSublease
    withLicense
    rentalPaymentMethods {
      cash
      bankingCard
      wireTransfer
      appleOrGooglePay
    }
    services {
      id
      value
    }
  }
`;
