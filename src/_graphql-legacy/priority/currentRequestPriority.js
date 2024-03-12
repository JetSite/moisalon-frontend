import { gql } from "@apollo/client";

export const currentRequestPriority = gql`
  query ($originId: String!) {
    currentRequestPriority(originId: $originId) {
      brandOrigin {
        name
      }
      masterOrigin {
        name
      }
      id
      origin
      originId
      ownerId
      requestComment
      salonOrigin {
        name
      }
      status
    }
  }
`;