import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'

export const getFeedCategories = gql`
  query feedCategories {
    feedCategories {
      data {
        id
        attributes {
            feedCategoryName
        }
      }
      ${metaInfo}
    }
  }
`
