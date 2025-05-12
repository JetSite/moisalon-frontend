const servicesFragment = `
id
service {
  data {
    id
    attributes {
      title
      service_categories {
        data {
          id
          attributes {
            title
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
`;

export default servicesFragment;
