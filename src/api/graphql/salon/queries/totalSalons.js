import { gql } from "@apollo/client";

export const totalSalons = gql`
  query totalSalons {
    salons {
      meta {
        pagination {
          total
        }
      }
    }
  }
`;
