import { gql } from "@apollo/client";

export const goodsCatalogQuery = gql`
  query goodsCatalogQuery(
    $categoryId: Int
    $after: String
    $first: Int
    $category: String
  ) {
    products(
      first: $first
      after: $after
      where: { categoryId: $categoryId, category: $category }
    ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          databaseId
          name
          productCategories {
            nodes {
              name
            }
          }
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
          type
        }
      }
    }
  }
`;
