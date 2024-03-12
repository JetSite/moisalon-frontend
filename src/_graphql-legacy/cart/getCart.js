import { gql } from "@apollo/client";

export const getCart = gql`
  query GetCartB2b {
    getCartB2b {
      total
      shippingTotal
      contents {
        key
        productId
        quantity
        product {
          id
          country
          amount
          amountSales
          countAvailable
          brandId
          categoryId
          currentAmount
          description
          photoIds
          title
          brand {
            address
            addressFull {
              full
              latitude
              longitude
              office
              city
            }
            id
            averageScore
            numberScore
            country
            minimalOrderPrice
            manufacture
            history
            termsDeliveryPrice
            description
            email
            id
            dontShowPrice
            logoId
            mastersIds
            name
            ownerId
            photoId
            salonIds
            seo {
              slug
            }
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
            socialNetworkUrls {
              youTube
              vKontakte
              odnoklassniki
              instagram
              facebook
            }
          }
        }
      }
    }
  }
`;
