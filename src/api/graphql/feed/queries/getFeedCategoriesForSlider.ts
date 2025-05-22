import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from 'src/api/graphql/common/imageInfo'

export const getFeedCategoriesForSlider = gql`
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
                  cover {
                    ${imageInfo}
                  }
                  feed_category {
                    data {
                      id
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
