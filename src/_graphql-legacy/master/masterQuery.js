import { gql } from "@apollo/client";
import { masterIdentityFragment } from "./masterIdentityFragment";

export const masterQuery = gql`
  query masterQuery($id: ID!) {
    master(id: $id) {
      id
      ...MasterIdentityFragment
      description
      averageScore
      numberScore
      experience
      email
      webSiteUrl
      onlineBookingUrl
      address
      resume
      seo {
        description
        slug
        title
      }
      phone {
        phoneNumber
        haveTelegram
        haveViber
        haveWhatsApp
      }
      addressFull {
        full
        latitude
        longitude
        office
        city
      }
      servicesMaster {
        id
        price
      }
      photosWorks(kind: "medium") {
        id
        kind
        url
      }
      photosDiploma(kind: "medium") {
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
      specializationsServices
      salonIds
    }
  }
  ${masterIdentityFragment}
`;
