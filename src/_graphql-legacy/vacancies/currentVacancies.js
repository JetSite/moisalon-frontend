import { gql } from "@apollo/client";

export const currentVacancies = gql`
  query ($originId: String!) {
    currentVacancies(originId: $originId) {
      id
      title
      desc
      isPublished
      short_desc
      createAt
      amountFrom
      amountTo
      originId
      origin
      photoId
      salonOrigin {
        name
      }
      brandOrigin {
        name
      }
    }
  }
`;
