import { gql } from "@apollo/client";

export const salonsByService = gql`
  query ListSalonsByService($serviceId: String!, $city: String!) {
    listSalonsByService(serviceId: $serviceId, city: $city) {
      id
      name
      isNotRent
      averageScore
      numberScore
      phones {
        phoneNumber
        haveTelegram
        haveViber
        haveWhatsApp
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
      lessor
      activities
      seo {
        description
        slug
        title
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
      servicesMaster {
        id
        price
      }
    }
  }
`;
