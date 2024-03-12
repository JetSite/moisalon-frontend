import { gql } from "@apollo/client";

export const educationSearchById = gql`
  query Education($id: String) {
    edu(id: $id) {
      id
      title
      averageScore
      desc
      originId
      isPublished
      short_desc
      numberScore
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
        userId
      }
      salonOrigin {
        name
        address {
          city
        }
        ownerId
      }
      brandOrigin {
        name
        addressFull {
          city
        }
        ownerId
      }
    }
  }
`;
