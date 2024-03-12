import { gql } from "@apollo/client";
import { salonLogoFragment } from "./salonLogoFragment";

export const salonIdentityFragment = gql`
  fragment SalonIdentityFragment on Salon {
    id
    name
    lessor
    isNotRent
    seo {
      slug
    }
    isPublished
    address {
      city
      full
    }
    ...SalonLogoFragment
  }
  ${salonLogoFragment}
`;
