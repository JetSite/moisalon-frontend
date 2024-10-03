import { gql } from '@apollo/client'

export const ADD_REVIEW_MASTER = gql`
  mutation createReview(
    $user: ID!
    $id: ID!
    $content: String!
    $publishedAt: DateTime
    $rating: ID
  ) {
    createReview(
      data: {
        user: $user
        master: $id
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
          master {
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
