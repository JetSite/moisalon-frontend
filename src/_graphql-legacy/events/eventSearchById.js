import { gql } from "@apollo/client";

export const eventSearchById = gql`
  query Events($id: String) {
    event(id: $id) {
      id
      title
      desc
      originId
      isPublished
      short_desc
      createAt
      dateStart
      dateEnd
      address
      originId
      origin
      photoId
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
      ownerId
    }
  }
`;
