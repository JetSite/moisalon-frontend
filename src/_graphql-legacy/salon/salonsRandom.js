import { gql } from "@apollo/client";

export const salonsRandom = gql`
  query ($count: Int!, $city: String) {
    salonsRandom(count: $count, city: $city) {
      id
      averageScore
      numberScore
      seatsCount {
        availableForRent
        total
      }
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
      phones {
        phoneNumber
      }
      services {
        id
        value
      }
      seo {
        slug
      }
      email
      name
      activities
      address {
        full
        city
        subwayStations {
          name
          lineName
          lineColor
        }
      }
    }
  }
`;
