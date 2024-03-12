import { gql } from "@apollo/client";

export const servicesWithSalonCount = gql`
  query SalonServicesCount {
    salonServicesCount {
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
