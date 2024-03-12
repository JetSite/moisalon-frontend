import { gql } from "@apollo/client";

export const salesSearchById = gql`
  query Sales($id: String) {
    sale(id: $id) {
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
