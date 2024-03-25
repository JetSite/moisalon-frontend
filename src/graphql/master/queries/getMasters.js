import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { cityInfo } from 'src/graphql/common/cityInfo'

export const getMasters = gql`
  query masters($itemsCount: Int!) {
    masters(pagination: { page: 1, pageSize: $itemsCount }) {
      data {
        id
        attributes {
            masterName
            masterPhone
            masterEmail
            salons {
              data {
                id
                attributes {
                    salonName
                }
              }
            }
            serviceCategories {
              id
              category {
                  data {
                      id
                      attributes {
                          serviceCategoryName
                      }
                  }
              }
              services {
                  id
                  serviceName 
                  price
              }
            }
            city {
              ${cityInfo}
            }
            masterPhoto {
              ${imageInfo}
            }
        }
      }
      ${metaInfo}
    }
  }
`
