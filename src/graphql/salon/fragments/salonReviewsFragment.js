const salonReviewsFragment = `
  review {
    data {
      id
      attributes {
        reviewTitle
        reviewContent
        user {
          data {
            id
            attributes {
              username
            }
          }
        }
        createdAt
        updatedAt
        publishedAt
      }
    }
  }
`;

export default salonReviewsFragment;
