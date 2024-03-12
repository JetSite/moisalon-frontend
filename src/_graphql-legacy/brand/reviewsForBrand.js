import { gql } from "@apollo/client";

export const reviewsForBrand = gql`
  query ($originId: String!) {
    reviewsForBrand(originId: $originId) {
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
