import { gql } from '@apollo/client'
import { onlyTitleFragment } from '../../fragments/onlyTitle'
import { metaInfo } from '../../common/metaInfo'

export const EQUIPMENT = gql`
  query Equipments {
    equipments {
      data {
        id
        attributes {
          title
            category {
              ${onlyTitleFragment}
            }
          }
        }
      meta {
        ${metaInfo}
      }
    }
  }
`
