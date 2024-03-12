import { gql } from "@apollo/client";

export const brandQuery = gql`
  query ($id: ID!) {
    brand(id: $id) {
      averageScore
      numberScore
      address
      country
      description
      email
      minimalOrderPrice
      manufacture
      history
      termsDeliveryPrice
      id
      logoId
      mastersIds
      name
      ownerId
      photoId
      salonIds
      addressFull {
        full
        latitude
        longitude
        office
        city
      }
      phone {
        phoneNumber
        haveWhatsApp
        haveViber
        haveTelegram
      }
      socialNetworkUrls {
        youTube
        vKontakte
        odnoklassniki
        instagram
        facebook
      }
      seo {
        description
        slug
        title
      }
      photo(kind: "medium") {
        id
        kind
        url
      }
    }
  }
`;
