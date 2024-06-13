const masterServicesFragment = `
id
  title
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
              title
            }
          }
        }
        title
      }
    }
  }
`

export default masterServicesFragment
