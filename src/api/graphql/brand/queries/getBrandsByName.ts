import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { brandForProductFragment } from '../../product/fragment/brandForProduct'

export const BRANDS_BY_NAME = gql`
  query brands($name: String!) {
    brands(filters: { name: { containsi: $name } }, pagination: { page: 1, pageSize: 100 }) {
      ${brandForProductFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
