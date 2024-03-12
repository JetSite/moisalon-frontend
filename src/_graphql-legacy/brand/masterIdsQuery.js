import { gql } from "@apollo/client";

export const masterIdsQuery = gql`
  query masterIdsQuery($ids: [ID]!) {
    masters(ids: $ids) {
      id
      addressFull {
        full
        latitude
        longitude
        office
        city
      }
      specializations
      name
      seo {
        slug
      }
      specializationsServices
      averageScore
      numberScore
      photo(kind: "medium") {
        id
        kind
        url
      }
    }
  }
`;
