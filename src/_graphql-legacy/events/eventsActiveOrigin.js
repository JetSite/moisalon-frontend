import { gql } from "@apollo/client";

export const eventsActiveOrigin = gql`
  query ($origin: String!) {
    eventsActiveOrigin(origin: $origin) {
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
