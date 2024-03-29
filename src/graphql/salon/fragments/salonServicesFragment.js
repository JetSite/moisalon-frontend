const salonServicesFragment = `
  services {
    id
    service {
      data {
        id
        attributes {
          service_categories {
            data {
              id
              attributes {
                serviceCategoryName
              }
            }
          }
        }
      }
    }
    serviceName
  }
`

export default salonServicesFragment
