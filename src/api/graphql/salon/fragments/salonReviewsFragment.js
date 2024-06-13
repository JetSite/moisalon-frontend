const salonReviewsFragment = `
  review {
    data {
      id
      attributes {
        title
        content
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
`

export default salonReviewsFragment
