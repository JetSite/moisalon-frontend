import { gql } from "@apollo/client";
import { masterIdentityFragment } from "./masterIdentityFragment";
import { masterSpecializationsServicesFragment } from "./masterSpecializationsServicesFragment";

export const masterPersonalInformationFragment = gql`
  fragment MasterPersonalInformationFragment on Master {
    ...MasterIdentityFragment
    ...MasterSpecializationsServicesFragment
    description
    email
    onlineBookingUrl
    experience
    phone {
      phoneNumber
      haveTelegram
      haveViber
      haveWhatsApp
    }
    socialNetworkUrls {
      facebook
      instagram
      odnoklassniki
      vKontakte
      youTube
    }
    webSiteUrl
  }
  ${masterIdentityFragment}
  ${masterSpecializationsServicesFragment}
`;
