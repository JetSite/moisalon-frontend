import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'

export const getFeeds = gql`
  query feeds {
    feeds {
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
      ${metaInfo}
    }
  }
`
