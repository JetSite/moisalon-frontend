import { gql } from '@apollo/client'

export const login = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
      user {
        id
        username
        phone
      }
    }
  }
`
