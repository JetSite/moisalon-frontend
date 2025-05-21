import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from 'src/api/graphql/common/imageInfo'

export const getFeedCategories = gql`
  query feedCategories {
    feedCategories {
      data {
        id
        attributes {
            title
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
                }
              }
            }
        }
      }
      meta {
        ${metaInfo}
      }
    }
  }
`
