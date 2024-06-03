const servicesFragment = `
id
service {
  data {
    id
    attributes {
      serviceName
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
price
priceTo
priceFrom
unitOfMeasurement
`

export default servicesFragment
