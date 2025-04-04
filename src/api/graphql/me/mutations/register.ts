import { gql } from '@apollo/client'

export const register = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(
      input: { email: $email, username: $username, password: $password }
    ) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`
