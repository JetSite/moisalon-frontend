import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { brandForProductFragment } from '../../product/fragment/brandForProduct'

export const getBrandsByName = gql`
  query brands($name: String!) {
    brands(filters: { name: { containsi: $name } }, pagination: { page: 1, pageSize: 100 }) {
      ${brandForProductFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
