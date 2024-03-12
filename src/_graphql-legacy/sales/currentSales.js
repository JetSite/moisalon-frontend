import { gql } from "@apollo/client";

export const currentSales = gql`
  query ($originId: String!) {
    currentSales(originId: $originId) {
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
