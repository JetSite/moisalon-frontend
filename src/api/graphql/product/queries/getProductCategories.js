import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { productFragment } from '../fragment/product'

export const getProductCategories = gql`
  query productCategories {
  productCategories(pagination: { page: 1, pageSize: 100 }) {
    data {
      id
      attributes {
        title
        products {
          ${productFragment}
        }
      }
    }
    meta {
        ${metaInfo}
      }
  }
}
`
