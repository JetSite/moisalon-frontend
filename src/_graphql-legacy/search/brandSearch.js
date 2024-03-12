import { gql } from "@apollo/client";

export const brandSearchQuery = gql`
  query brandsSearch(
    $query: String
    $cursor: String = null
    $categoryId: String
  ) {
    brandsSearch(query: $query, categoryId: $categoryId) {
      filterDefinition
      connection(first: 18, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        totalCount
        nodes {
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
          dontShowPrice
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
`;
