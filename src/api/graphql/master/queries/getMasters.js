import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { cityInfo } from 'src/api/graphql/common/cityInfo'

export const getMasters = gql`
  query masters($city: String!,$itemsCount: Int!) {
    masters(filters:{city:{cityName:{eq:$city }}}, pagination: { page: 1, pageSize: $itemsCount }) {
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
            services {
                id
                service {
                  data {
                    id
                    attributes {
                      service_categories {
                        data {
                          id
                          attributes {
                            serviceCategoryName
                          }
                        }
                      }
                    }
                  }
                }
                serviceName
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
