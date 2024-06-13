import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'

export const getFeeds = gql`
  query feeds {
    feeds {
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
      ${metaInfo}
    }
  }
`
