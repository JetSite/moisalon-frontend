import { gql } from "@apollo/client";

export const salesActiveOrigin = gql`
  query ($origin: String!) {
    salesActiveOrigin(origin: $origin) {
      id
      title
      desc
      isPublished
      short_desc
      createAt
      dateStart
      dateEnd
      originId
      origin
      photoId
      value
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
