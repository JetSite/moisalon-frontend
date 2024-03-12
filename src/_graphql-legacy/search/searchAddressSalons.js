import { gql } from "@apollo/client";

export const searchAddressSalons = gql`
  query SearchAllQuery($input: WorkplacesSearchInput!, $cursor: String = null) {
    salonSearch(input: $input) {
      salonsConnection(first: 100000, after: $cursor) {
        nodes {
          salon {
            id
            address {
              latitude
              longitude
              city
            }
            seo {
              slug
            }
          }
        }
        totalCount
      }
    }
  }
`;
