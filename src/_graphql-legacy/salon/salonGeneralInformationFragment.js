import { gql } from "@apollo/client";
import { salonLogoFragment } from "./salonLogoFragment";
import { salonPhotosFragment } from "./salonPhotosFragment";
import { salonDefaultPhotoFragment } from "./salonDefaultPhotoFragment";

export const salonGeneralInformationFragment = gql`
  fragment SalonGeneralInformationFragment on Salon {
    isNotRent
    services {
      id
      value
    }
    activities
    address {
      city
      subwayStations {
        distance
        lineAlias
        lineColor
        lineName
        name
      }
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
    description
    email
    locationDirections
    onlineBookingUrl
    phones {
      phoneNumber
      haveTelegram
      haveViber
      haveWhatsApp
    }
    ...SalonPhotosFragment
    ...SalonLogoFragment
    ...SalonDefaultPhotoFragment
    workplacesServices {
      id
      value
    }
    socialNetworkUrls {
      facebook
      instagram
      odnoklassniki
      vKontakte
      youTube
    }
    webSiteUrl
    workingHours {
      endDayOfWeek
      endHour
      endMinute
      startDayOfWeek
      startHour
      startMinute
    }
  }
  ${salonPhotosFragment}
  ${salonDefaultPhotoFragment}
  ${salonLogoFragment}
`;
