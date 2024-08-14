import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'

export const getBrandsByName = gql`
  query brands($name: String!) {
    brands(filters: { name: { containsi: $name } }, pagination: { page: 1, pageSize: 100 }) {
      data {
        id
        attributes {
          name
          slug
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
