import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import { cityFragment } from '../../fragments/city'
import { metaInfo } from '../../common/metaInfo'

export const BRANDS = gql`
  query brands($itemsCount: Int, $page: Int) {
    brands(filters: {products: { id: { notNull: true }} }, pagination: { page: $page, pageSize: $itemsCount }) {
      data {
        id
        attributes {
          name
          logo {
            ${imageInfo}
          }
          city {
            ${cityFragment}
          }
        }
      }
      meta {
        ${metaInfo}
      }
    }
  }
`
