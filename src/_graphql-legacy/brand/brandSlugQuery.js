import { gql } from "@apollo/client";

export const brandSlugQuery = gql`
  query brandSlugQuery($slug: String) {
    brandSlug(slug: $slug) {
      averageScore
      numberScore
      address
      country
      description
      email
      minimalOrderPrice
      manufacture
      dontShowPrice
      history
      dontShowPrice
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
