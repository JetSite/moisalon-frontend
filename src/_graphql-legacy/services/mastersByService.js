import { gql } from "@apollo/client";

export const mastersByService = gql`
  query ListMastersByService($serviceId: String!, $city: String!) {
    listMastersByService(serviceId: $serviceId, city: $city) {
      averageScore
      numberScore
      addressFull {
        full
        latitude
        longitude
        office
        city
      }
      name
      description
      email
      id
      onlineBookingUrl
      photo(kind: "medium") {
        id
        kind
        url
      }
      phone {
        phoneNumber
        haveWhatsApp
        haveViber
        haveTelegram
      }
      photoId
      socialNetworkUrls {
        youTube
        vKontakte
        odnoklassniki
        instagram
        facebook
      }
      seo {
        slug
      }
      specializations
      specializationsServices
      userId
      webSiteUrl
      servicesMaster {
        id
        price
      }
    }
  }
`;
