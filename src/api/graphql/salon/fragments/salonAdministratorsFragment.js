const salonAdministratorsFragment = `
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
`

export default salonAdministratorsFragment
