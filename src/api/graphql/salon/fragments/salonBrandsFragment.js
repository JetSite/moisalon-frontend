const salonBrandsFragment = `
  brands {
    data {
      id
      attributes {
        name
        city {
          data {
            id
            attributes {
              name
              slug
            }
          }
        }
        logo {
          data {
            id
            attributes {
              name
              alternativeText
              formats
              url
              previewUrl
            }
          }
        }
      }
    }
  }
`

export default salonBrandsFragment
