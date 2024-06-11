import { gql } from '@apollo/client'

export const ADD_REVIEW_BRAND = gql`
  mutation createReview($user: ID!, $id: ID!, $content: String!) {
    createReview(
      data: {
        user: $user
        brand: $id
        content: $content
        publishedAt: "2024-04-28T12:00:00.000Z"
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
