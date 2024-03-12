import { gql } from "@apollo/client";

export const masterSearchQuery = gql`
  query mastersSearch($input: MasterSearchInput!, $cursor: String = null) {
    masterSearch(input: $input) {
      filterDefinition
      connection(first: 20, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        totalCount
        nodes {
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
        }
      }
    }
  }
`;
