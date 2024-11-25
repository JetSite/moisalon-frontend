import { gql } from '@apollo/client'

// export const REMOVE_CART = gql`
//   mutation deleteCart($id: ID!) {
//     deleteCart(id: $id) {
//       data {
//         id
//       }
//     }
//   }
// `

export const REMOVE_CART = gql`
  mutation deleteCart($id: ID!) {
    updateCart(id: $id, data: { user: null }) {
      data {
        id
        attributes {
          user {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`
