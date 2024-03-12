import { gql } from "@apollo/client";
import { salonLogoFragment } from "./salonLogoFragment";
import { seatFragment } from "./seatFragment";

export const salonQuery = gql`
  query SalonQuery($id: ID!, $filterDefinition: ID) {
    seatIds: workplacesSearch2(
      salonId: $id
      filterDefinition: $filterDefinition
    )
    salon(id: $id) {
      id
      averageScore
      numberScore
      isPublished
      name
      lessor
      activities
      isOwnerConfirmed
      ...SalonLogoFragment
      socialNetworkUrls {
        facebook
        instagram
        odnoklassniki
        vKontakte
        youTube
      }
      contactPersonEmail
      contactPersonName
      contactPersonPhone {
        phoneNumber
        haveTelegram
        haveViber
        haveWhatsApp
      }
      contactPersonWorkingHours {
        endDayOfWeek
        endHour
        endMinute
        startDayOfWeek
        startHour
        startMinute
      }
      photos {
        id
        kind
        url
      }
      seo {
        description
        slug
        title
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
      ownerId
      address {
        city
        full
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
      servicesMaster {
        id
        price
      }
      rooms {
        defaultPhotoId
        hasWindows
        id
        photoIds
        description
        floor
        space
        title
        wetPointsHands
        wetPointsHead
        wetPointsShower
        seats {
          ...SeatFragment
        }
        services {
          id
          value
        }
      }
    }
  }
  ${salonLogoFragment}
  ${seatFragment}
`;
