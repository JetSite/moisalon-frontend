import { gql } from "@apollo/client";
import { masterIdentityFragment } from "./master/masterIdentityFragment";
import { salonIdentityFragment } from "./salon/salonIdentityFragment";
import { salonSeatsCountFragment } from "./salon/salonSeatsCountFragment";

export const meAndServiceCatalogsQuery = gql`
  query meAndServiceCatalogsQuery {
    me {
      info {
        id
        avatar
        defaultCity
        displayName
        email
        city
        phoneNumber
      }
      master {
        id
        ...MasterIdentityFragment
      }
      salons {
        id
        ...SalonIdentityFragment
        ...SalonSeatsCountFragment
      }
    }
    locationByIp {
      data {
        city
      }
    }
  }
  
  ${masterIdentityFragment}
  ${salonIdentityFragment}
  ${salonSeatsCountFragment}
`;
