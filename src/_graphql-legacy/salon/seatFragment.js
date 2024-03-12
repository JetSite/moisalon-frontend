import { gql } from "@apollo/client";

export const seatFragment = gql`
  fragment SeatFragment on Seat {
    id
    seatNumber
    photo(kind: "medium") {
      id
      kind
      url
    }
    activities
    equipments
    isAvailableForRent
    rentalPricing {
      hour
      day
      week
      month
      year
    }
    rentalPaymentMethods {
      cash
      bankingCard
      wireTransfer
      appleOrGooglePay
    }
    allowJointRental
    allowSublease
    withLicense
    seo {
      slug
      title
      description
    }
  }
`;
