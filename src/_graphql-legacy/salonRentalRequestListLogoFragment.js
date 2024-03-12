import { gql } from "@apollo/client";

export const salonRentalRequestListLogoFragment = gql`
  fragment SalonRentalRequestListLogoFragment on Salon {
    rentalRequestListLogo: logo(kind: "medium") {
      id
      kind
      url
    }
  }
`;