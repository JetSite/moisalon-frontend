import { gql } from "@apollo/client";

export const goodSearch = gql`
  query GoodsSearch($input: ProductsSearchInput!, $cursor: String = null) {
    goodsSearch(input: $input) {
      filterDefinition
      connection(first: 12, after: $cursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          country
          categoryId
          brandId
          description
          shortDescription
          photoIds
          amount
          title
          currentAmount
          amountSales
          brand {
            id
            name
            dontShowPrice
            minimalOrderPrice
          }
          countAvailable
          sku
          size
          color
          material
          quantityInPac
        }
      }
    }
  }
`;
