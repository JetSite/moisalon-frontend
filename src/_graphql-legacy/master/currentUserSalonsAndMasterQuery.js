import { gql } from "@apollo/client";
import { masterIdentityFragment } from "./masterIdentityFragment";
import { salonIdentityFragment } from "../salon/salonIdentityFragment";
import { salonSeatsCountFragment } from "../salon/salonSeatsCountFragment";
import { rentalRequestFragment } from "../rentalRequestFragment";

export const currentUserSalonsAndMasterQuery = gql`
  query currentUserSalonsAndMasterQuery {
    locationByIp {
      data {
        city
      }
    }
    me {
      info {
        defaultCity
        id
        avatar
        displayName
        email
        city
        phoneNumber
      }
      master {
        id
        ...MasterIdentityFragment
        description
        experience
        email
        webSiteUrl
        onlineBookingUrl
        address
        phone {
          phoneNumber
          haveTelegram
          haveViber
          haveWhatsApp
        }
        resume
        searchWork
        seo {
          slug
        }
        addressFull {
          full
          latitude
          longitude
          office
          city
        }
        socialNetworkUrls {
          facebook
          instagram
          odnoklassniki
          vKontakte
          youTube
        }
        specializationsServices
      }
      salons {
        ...SalonIdentityFragment
        ...SalonSeatsCountFragment
      }
      rentalRequests {
        id
        user {
          id
          displayName
          email
          city
          phoneNumber
        }
        ...RentalRequestFragment
      }
    }
  }
  ${masterIdentityFragment}
  ${salonIdentityFragment}
  ${salonSeatsCountFragment}
  ${rentalRequestFragment}
`;
