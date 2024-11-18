import { gql } from '@apollo/client'

// TODO: пока нет у мероприятий отзывов

export const ADD_REVIEW_EVENT = gql`
  mutation createReview(
    $user: ID!
    $id: ID!
    $content: String!
    $publishedAt: DateTime!
  ) {
    createReview(
      data: {
        user: $user
        event: $id
        content: $content
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          title
          content
          publishedAt
          event {
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
