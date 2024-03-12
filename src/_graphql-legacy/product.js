import { gql } from "@apollo/client";

export const productSearch = gql`
  query ProductSearch($id: String!) {
    product(id: $id) {
      id
      country
      categoryId
      brandId
      description
      shortDescription
      photoIds
      amount
      countAvailable
      title
      amountSales
      currentAmount
      brand {
        averageScore
        id
        dontShowPrice
        numberScore
        name
        seo {
          slug
        }
        addressFull {
          city
        }
        minimalOrderPrice
      }
      sku
      size
      color
      material
      quantityInPac
    }
  }
`;
