import { gql } from "@apollo/client";

export const reviewsForSalon = gql`
  query ($originId: String!) {
    reviewsForSalon(originId: $originId) {
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
