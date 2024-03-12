import { gql } from "@apollo/client";

export const requestOnePriority = gql`
  query ($id: String!) {
    requestOnePriority(id: $id) {
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