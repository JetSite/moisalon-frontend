const salonMastersFragment = `
  masters {
    data {
      id
      attributes {
        masterName
        masterPhone
        masterEmail
        masterPhoto {
          data {
            id
            attributes {
              url
              name
            }
          }
        }
        averageScore
        numberScore
        services {
          serviceName
        }
        city {
          data {
            id
            attributes {
              cityName
              citySlug
            }
          }
        }
      }
    }
  }
`

export default salonMastersFragment
