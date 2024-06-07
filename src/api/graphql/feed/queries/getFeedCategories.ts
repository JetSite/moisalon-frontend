import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from 'src/api/graphql/common/imageInfo'

export const getFeedCategories = gql`
  query feedCategories {
    feedCategories {
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
      ${metaInfo}
    }
  }
`
