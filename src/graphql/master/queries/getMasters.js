import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { cityInfo } from 'src/graphql/common/cityInfo'

export const getMasters = gql`
  query masters {
    masters {
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
              price
              serviceName 
              service {
                data {
                  id
                  attributes {
                      serviceName
                  }
                }
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
