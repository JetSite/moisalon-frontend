import { gql } from "@apollo/client";

export const getSeatEquipment = gql`
  query {
    equipmentSeatServicesCatalog {
      groups {
        id
        title
      }
    }
  }
`;
