import { gql } from '@apollo/client'

export const RATE_SALON = gql`
  mutation createRating($value: ID!, $salon: ID!, $user: ID!) {
    createRating(data: { rating_value: $value, salon: $salon, user: $user }) {
      data {
        id
        attributes {
          salon {
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
