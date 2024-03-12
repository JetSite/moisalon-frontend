import { gql } from "@apollo/client";

export const currentUserEvents = gql`
  query userEvents {
    userEvents {
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
    }
  }
`;
