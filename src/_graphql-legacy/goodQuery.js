import { gql } from "@apollo/client";

export const goodQuery = gql`
  query GetSingleProduct($id: ID!) {
    product(idType: DATABASE_ID, id: $id) {
      databaseId
      name
      averageRating
      ... on SimpleProduct {
        id
        name
        description
        image {
          sourceUrl
        }
        attributes {
          nodes {
            name
            options
          }
        }
        price
        regularPrice
        salePrice
      }
      productCategories {
        nodes {
          name
        }
      }
    }
  }
`;
