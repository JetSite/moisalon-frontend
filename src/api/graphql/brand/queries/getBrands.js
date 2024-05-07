import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'

export const getBrands = gql`
  query brands($itemsCount: Int!) {
    brands(pagination: { page: 1, pageSize: $itemsCount }) {
      data {
        id
        attributes {
            brandName
            brandLogo {
              ${imageInfo}
            }
        }
      }
      ${metaInfo}
    }
  }
`
