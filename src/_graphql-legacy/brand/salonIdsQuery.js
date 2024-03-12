import { gql } from "@apollo/client";

export const salonIdsQuery = gql`
  query salonIdsQuery($ids: [ID]!) {
    salonsList(ids: $ids) {
      id
      isPublished
      name
      activities
      logo(kind: "big") {
        id
        kind
        url
      }
      defaultPhoto(kind: "big") {
        id
        kind
        url
      }
      socialNetworkUrls {
        facebook
        instagram
        odnoklassniki
        vKontakte
        youTube
      }
      photos {
        id
        kind
        url
      }
      seo {
        slug
      }
      permissions {
        canEdit
      }
      description
      workingHours {
        startDayOfWeek
        startHour
        startMinute
        endDayOfWeek
        endHour
        endMinute
      }
      phones {
        phoneNumber
        haveTelegram
        haveViber
        haveWhatsApp
      }
      email
      locationDirections
      webSiteUrl
      onlineBookingUrl
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
      services {
        id
        value
      }
      workplacesServices {
        id
        value
      }
    }
  }
`;
