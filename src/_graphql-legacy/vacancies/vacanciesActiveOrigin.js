import { gql } from "@apollo/client";

export const vacanciesActiveOrigin = gql`
  query ($origin: String!) {
    vacanciesActiveOrigin(origin: $origin) {
      id
      title
      desc
      originId
      isPublished
      short_desc
      createAt
      amountFrom
      amountTo
      originId
      origin
      photoId
    }
  }
`;
