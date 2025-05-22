import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'

export const getFeedsForSlider = gql`
  query feeds {
    feeds(pagination: { page: 1, pageSize: 20 }) {
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
`
