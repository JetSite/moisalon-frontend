import { gql } from "@apollo/client";

export const userBrandsQuery = gql`
  query userBrandsQuery {
    userBrands {
      address
      country
      description
      email
      id
      logoId
      mastersIds
      name
      history
      manufacture
      ownerId
      photoId
      addressFull {
        full
        latitude
        longitude
        office
        city
      }
      salonIds
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
