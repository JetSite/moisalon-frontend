const masterServicesFragment = `
id
  serviceName
  price
  priceTo
  priceFrom
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
`

export default masterServicesFragment
