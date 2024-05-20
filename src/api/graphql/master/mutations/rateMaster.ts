import { gql } from '@apollo/client'

export const RATE_MASTER = gql`
  mutation createRating($value: ID!, $master: ID!, $user: ID!) {
    createRating(data: { rating_value: $value, master: $master, user: $user }) {
      data {
        id
        attributes {
          master {
            data {
              id
              attributes {
                name
                ratings {
                  data {
                    id
                    attributes {
                      rating_value {
                        data {
                          id
                          attributes {
                            title
                          }
                        }
                      }
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
            }
          }
        }
      }
    }
  }
`
