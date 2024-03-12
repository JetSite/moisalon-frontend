const salonBrandsFragment = `
  brands {
    data {
      id
      attributes {
        brandName
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
`;

export default salonBrandsFragment;
