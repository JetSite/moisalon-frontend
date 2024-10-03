import { gql } from '@apollo/client'

export const ADD_REVIEW_SALON = gql`
  mutation createReview(
    $user: ID!
    $id: ID!
    $content: String!
    $rating: ID
    $publishedAt: DateTime
  ) {
    createReview(
      data: {
        user: $user
        salon: $id
        content: $content
        rating: $rating
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          title
          content
          publishedAt
          salon {
            data {
              id
              attributes {
                reviews {
                  data {
                    id
                    attributes {
                      content
                      title
                      rating {
                        data {
                          id
                          attributes {
                            title
                          }
                        }
                      }
                      publishedAt
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
