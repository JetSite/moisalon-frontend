import { gql } from "@apollo/client";

export const salonLogoFragment = gql`
  fragment SalonLogoFragment on Salon {
    logo(kind: "medium") {
      id
      kind
      url
    }
  }
`;
