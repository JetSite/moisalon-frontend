const salonAdministratorsFragment = `
  data {
    id
    attributes {
      administratorName
      administratorPhone
      administratorEmail
      administratorPhoto {
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
