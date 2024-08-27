import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'

export const GET_SERVICES_M_CAT = gql`
  query servicesMCat {
 servicesMCat{
  data{
    id
    attributes{
    title
      services_m {
        data {
          id
          attributes {
            title
          }
        }
      }
    }
  }
  meta {
    ${metaInfo}
  }
}
}
`
