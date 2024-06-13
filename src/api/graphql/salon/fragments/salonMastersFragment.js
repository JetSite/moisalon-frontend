const salonMastersFragment = `
  masters {
    data {
      id
      attributes {
        name
        phone
        email
        photo {
          data {
            id
            attributes {
              url
              name
            }
          }
        }
        rating
ratingCount
reviewsCount
        services {
          title
        }
        city {
          data {
            id
            attributes {
              name
              slug
            }
          }
        }
      }
    }
  }
`

export default salonMastersFragment
