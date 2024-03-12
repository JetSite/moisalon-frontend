import { gql } from "@apollo/client";

export const currentEducation = gql`
  query ($originId: String!) {
    currentEducation(originId: $originId) {
      id
      title
      desc
      originId
      isPublished
      averageScore
      numberScore
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
