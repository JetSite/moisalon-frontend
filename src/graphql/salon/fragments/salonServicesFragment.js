const salonServicesFragment = `
services {
  id
  serviceName
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
        serviceName
      }
    }
  }
}
`

export default salonServicesFragment
