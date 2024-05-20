import { gql } from '@apollo/client'

export const RATE_BRAND = gql`
  mutation createRating($value: ID!, $brand: ID!, $user: ID!) {
    createRating(data: { rating_value: $value, brand: $brand, user: $user }) {
      data {
        id
        attributes {
          brand {
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
