import { gql } from '@apollo/client'
import { imageInfo } from 'src/api/graphql/common/imageInfo'

export const getFeed = gql`
  query feed($id: ID!) {
    feed(id: $id) {
      data {
        id
        attributes {
          title
          content
          cover {
            ${imageInfo}
          }
          shortDescription
          feed_category {
            data {
              id
              attributes {
                title
              }
            }
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`
