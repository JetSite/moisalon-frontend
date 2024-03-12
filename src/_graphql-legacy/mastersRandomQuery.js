import { gql } from "@apollo/client";

export const mastersRandomQuery = gql`
  query ($count: Int!, $city: String) {
    mastersRandom(count: $count, city: $city) {
      name
      averageScore
      numberScore
      description
      email
      addressFull {
        full
        latitude
        longitude
        office
        city
      }
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
      rating
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
    }
  }
`;
