import { gql } from '@apollo/client'
import { imageInfo } from 'src/api/graphql/common/imageInfo'

export const getFeedCategory = gql`
  query feedCategory($id: ID!) {
    feedCategory(id: $id) {
      data {
        id
        attributes {
            feedCategoryName
            title
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
                }
              }
            }
        }
      }
    }
  }
`
