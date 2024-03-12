import { gql } from "@apollo/client";

export const reviewsforProductB2c = gql`
  query ($originId: String!) {
    reviewsForProduct(originId: $originId) {
      id
      origin
      originId
      ownerId
      description
      isPublished
      scores
      name
      deleted
      updatedAt
      createAt
    }
  }
`;
