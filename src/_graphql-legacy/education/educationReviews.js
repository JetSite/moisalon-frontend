import { gql } from "@apollo/client";

export const educationReviews = gql`
  query ($id: String) {
    comments(id: $id) {
      createAt
      deleted
      description
      id
      originId
      ownerId
      updatedAt
      user {
        displayName
        phoneNumber
        email
      }
    }
  }
`;
