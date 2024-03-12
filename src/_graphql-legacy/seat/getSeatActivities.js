import { gql } from "@apollo/client";

export const getSeatActivities = gql`
  query {
    activitiesSeatServicesCatalog {
      groups {
        id
        title
      }
    }
  }
`;
