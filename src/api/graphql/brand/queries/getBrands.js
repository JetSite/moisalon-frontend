import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'

export const getBrands = gql`
  query brands($itemsCount: Int, $page: Int) {
    brands(pagination: { page: $page, pageSize: $itemsCount }) {
      data {
        id
        attributes {
          city {
            data {
              id
              attributes {
                name
                slug
              }
            }
          }
            name
            logo {
              ${imageInfo}
            }
            
        }
      }
      meta {
        ${metaInfo}
      }
    }
  }
`
