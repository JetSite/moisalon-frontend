const servicesFragment = `
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
price
priceTo
priceFrom
unitOfMeasurement
`

export default servicesFragment
