import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { cityInfo } from 'src/graphql/common/cityInfo'

export const getMastersTroughCity = gql`
  query masters($cityName: [String],$itemsCount: Int!) {
    masters(filters: {city: {cityName: {in: $cityName}}}, pagination: { page: 1, pageSize: $itemsCount }) {
      data {
        id
        attributes {
            masterName
            masterPhone
            masterAddress
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
