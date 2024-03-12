import { gql } from "@apollo/client";

export const servicesWithMasterCount = gql`
  query MastersServicesCount($city: String!) {
    mastersServicesCount(city: $city) {
      groups {
        id
        title
        description
        count
        subGroups {
          count
          id
          title
          description
          items {
            count
            id
            kind
            title
          }
        }
        items {
          count
          id
          kind
          title
        }
      }
    }
  }
`;
