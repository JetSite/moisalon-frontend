import { gql } from '@apollo/client'

export const UPDATE_REVIEW = gql`
  mutation updateReview(
    $content: String
    $rating: ID
    $itemID: ID!
    $publishedAt: DateTime
  ) {
    updateReview(
      id: $itemID
      data: { content: $content, rating: $rating, publishedAt: $publishedAt }
    ) {
      data {
        id
        attributes {
          title
          content
          publishedAt
          rating {
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
