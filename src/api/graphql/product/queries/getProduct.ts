import { gql } from '@apollo/client'
import { productFragment } from '../fragment/product'

export const PRODUCT_BY_ID = gql`
  query productById($id: ID!) {
  product(id: $id) {
    ${productFragment}
  }
}
`
