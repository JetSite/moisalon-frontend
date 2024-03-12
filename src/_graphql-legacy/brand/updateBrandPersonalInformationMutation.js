import { gql } from "@apollo/client";

export const updateBrandPersonalInformationMutation = gql`
  mutation updateBrandInformationMutation(
    $input: UpdateBrandInformationInput!
  ) {
    updateBrandInformation(input: $input) {
      address
      addressFull {
        full
        latitude
        longitude
        office
        city
      }
      country
      description
      history
      manufacture
      email
      id
      mastersIds
      ownerId
      salonIds
      phone {
        phoneNumber
        haveWhatsApp
        haveViber
        haveTelegram
      }
      socialNetworkUrls {
        youTube
        vKontakte
        odnoklassniki
        instagram
        facebook
      }
    }
  }
`;
