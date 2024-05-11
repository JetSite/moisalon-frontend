import { gql } from '@apollo/client'

export const changeMe = gql`
  mutation changeMe($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
        attributes {
          username
          email
          phone
          role {
            data {
              id
              attributes {
                name
              }
            }
          }
          city {
            data {
              attributes {
                cityName
                citySlug
              }
            }
          }
          selected_city {
            data {
              id
              attributes {
                cityName
                citySlug
              }
            }
          }
        }
      }
    }
  }
`
