import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'

export const getServiceCategories = gql`
  query serviceCategories {
    serviceCategories {
      data {
        id
        attributes {
            title
            services {
              data {
                id
                attributes {
                    title
                }
              }
            }
        }
      }
      ${metaInfo}
    }
  }
`
