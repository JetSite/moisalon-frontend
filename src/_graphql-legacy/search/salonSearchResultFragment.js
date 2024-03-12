import { gql } from "@apollo/client";
import { seatFragment } from "../salon/seatFragment";

export const salonSearchResultFragment = gql`
  fragment SalonSearchResultFragment on SalonSearchResult {
    seatCount
    minPrice {
      hour
      day
      week
      month
      year
    }
    salon {
      isNotRent
      averageScore
      numberScore
      phones {
        phoneNumber
        haveTelegram
        haveViber
        haveWhatsApp
      }
      id
      defaultPhoto(kind: "medium") {
        id
        kind
        url
      }
      logo(kind: "medium") {
        id
        kind
        url
      }
      name
      lessor
      activities
      seo {
        description
        slug
        title
      }
      rooms {
        id
        seats {
          ...SeatFragment
        }
      }
      address {
        full
        city
        latitude
        longitude
        subwayStations {
          name
          lineName
          lineColor
        }
      }
    }
  }
  ${seatFragment}
`;
