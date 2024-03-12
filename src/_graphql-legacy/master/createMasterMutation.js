import { gql } from "@apollo/client";
import { masterIdentityFragment } from "./masterIdentityFragment";

export const createMasterMutation = gql`
  mutation createMasterMutation($input: CreateMasterInput!) {
    createMaster(input: $input) {
      id
      description
      email
      webSiteUrl
      onlineBookingUrl
      address
      phone {
        phoneNumber
        haveTelegram
        haveViber
        haveWhatsApp
      }
      addressFull {
        full
        latitude
        longitude
        office
        city
      }
      socialNetworkUrls {
        facebook
        instagram
        odnoklassniki
        vKontakte
        youTube
      }
      specializationsServices
      ...MasterIdentityFragment
    }
  }
  ${masterIdentityFragment}
`;
