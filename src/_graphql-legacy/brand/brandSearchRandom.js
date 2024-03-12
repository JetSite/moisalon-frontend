import { gql } from "@apollo/client";

export const brandsRandomQuery = gql`
  query ($count: Int!) {
    brandsRandom(count: $count) {
      address
      country
      averageScore
      numberScore
      description
      email
      id
      logoId
      mastersIds
      name
      ownerId
      photoId
      salonIds
      photo(kind: "big") {
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
      seo {
        slug
      }
      socialNetworkUrls {
        youTube
        vKontakte
        odnoklassniki
        instagram
        facebook
      }
    }
  }
`;
