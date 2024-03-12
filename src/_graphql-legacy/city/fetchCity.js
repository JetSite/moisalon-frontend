import { gql } from "@apollo/client";

export const fetchCity = gql`
  query fetchCity {
    me {
      info {
        id
        city
        defaultCity
      }
    }
    locationByIp {
      data {
        city
      }
    }
  }
`;
