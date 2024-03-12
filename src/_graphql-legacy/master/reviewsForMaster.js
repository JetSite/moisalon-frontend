import { gql } from "@apollo/client";

export const reviewsForMaster = gql`
  query($originId: String!) {
    reviewsForMaster(originId: $originId) {
      createAt
      createUserId
      deleted
      description
      id
      isPublished
      name
      origin
      originId
      ownerId
      updatedAt
    }
  }
`;