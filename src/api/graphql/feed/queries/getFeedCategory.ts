import { gql } from '@apollo/client'
import { imageInfo } from 'src/api/graphql/common/imageInfo'

export const getFeedCategory = gql`
  query feedCategory($id: ID!) {
    feedCategory(id: $id) {
      data {
        id
        attributes {
            title
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
    }
  }
`
