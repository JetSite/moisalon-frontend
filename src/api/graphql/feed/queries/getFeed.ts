import { gql } from '@apollo/client'
import { imageInfo } from 'src/api/graphql/common/imageInfo'

export const getFeed = gql`
  query feed($id: ID!) {
    feed(id: $id) {
      data {
        id
        attributes {
          beautyFeedTitle
          beautyFeedContent
          beautyFeedCover {
            ${imageInfo}
          }
          shortDescription
          feed_category {
            data {
              id
              attributes {
                feedCategoryName
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
