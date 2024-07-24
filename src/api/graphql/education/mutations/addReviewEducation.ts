import { gql } from '@apollo/client'

export const ADD_REVIEW_EDUCATION = gql`
  mutation createReview(
    $user: ID!
    $id: ID!
    $content: String!
    $publishedAt: DateTime!
  ) {
    createReview(
      data: {
        user: $user
        educations: $id
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
          educations {
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
