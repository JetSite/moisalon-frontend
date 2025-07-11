import { gql } from '@apollo/client'

export const BRANDS = gql`
  query brands($itemsCount: Int, $page: Int) {
    brands(pagination: { page: $page, pageSize: $itemsCount }) {
      data {
        id
        attributes {
          name
          logo {
            url
          }
        }
      }
    }
  }
`
