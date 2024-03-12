import { gql } from "@apollo/client";
import { rentalRequestOfMasterFragment } from "./rentalRequestOfMasterFragment";

export const seatQuery = gql`
  query SeatQuery($salonId: ID!, $roomId: ID!, $seatId: ID!) {
    salon(id: $salonId) {
      room(id: $roomId) {
        id
        photos(kind: "medium") {
          id
          kind
          url
        }
        space
        floor
        hasWindows
        schema(kind: "medium") {
          id
          kind
          url
        }
        wetPointsHands
        wetPointsHead
        wetPointsShower
        services {
          id
          value
        }
        seat(id: $seatId) {
          id
          photo(kind: "medium") {
            id
            kind
            url
          }
          seatNumber
          activities
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
          ...RentalRequestOfMasterFragment
          allowJointRental
          allowSublease
          seo {
            slug
            title
            description
          }
        }
      }
    }
  }
  ${rentalRequestOfMasterFragment}
`;
