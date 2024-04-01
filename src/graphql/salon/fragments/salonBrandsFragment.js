const salonBrandsFragment = `
  brands {
    data {
      id
      attributes {
        brandName
        city {
          data {
            id
            attributes {
              cityName
              citySlug
            }
          }
        }
        brandLogo {
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
