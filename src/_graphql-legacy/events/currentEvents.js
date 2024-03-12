import { gql } from "@apollo/client";

export const currentEvents = gql`
  query ($originId: String!) {
    currentEvents(originId: $originId) {
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
      }
      salonOrigin {
        name
      }
      brandOrigin {
        name
      }
    }
  }
`;
