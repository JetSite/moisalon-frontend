import { gql } from '@apollo/client'

export const CREATE_SALON = gql`
  mutation createReview($user: ID!, $id: ID!, $content: String!) {
    createReview(
      data: {
        user: $user
        salon: $id
        reviewContent: $content
        publishedAt: "2024-04-28T12:00:00.000Z"
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
