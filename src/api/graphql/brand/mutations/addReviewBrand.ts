import { gql } from '@apollo/client'

export const ADD_REVIEW_BRAND = gql`
  mutation createReview(
    $user: ID!
    $id: ID!
    $content: String!
    $publishedAt: DateTime!
    $rating: ID
  ) {
    createReview(
      data: {
        user: $user
        brand: $id
        content: $content
        publishedAt: $publishedAt
        rating: $rating
      }
    ) {
      data {
        id
        attributes {
          title
          content
          publishedAt
          brand {
            data {
              id
              attributes {
                reviews {
                  data {
                    id
                    attributes {
                      content
                      title
                      publishedAt
                      rating {
                        data {
                          id
                          attributes {
                            title
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
