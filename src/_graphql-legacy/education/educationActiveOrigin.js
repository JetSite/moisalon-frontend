import { gql } from "@apollo/client";

export const educationActiveOrigin = gql`
  query ($origin: String!) {
    educationActiveOrigin(origin: $origin) {
      id
      title
      desc
      originId
      isPublished
      short_desc
      createAt
      dateStart
      dateEnd
      originId
      origin
      photoId
      amount
      masterOrigin {
        name
        addressFull {
          city
        }
      }
      salonOrigin {
        name
        address {
          city
        }
      }
      brandOrigin {
        name
        addressFull {
          city
        }
      }
    }
  }
`;
