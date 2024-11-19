import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { brandFragment } from '../../fragments/brand'

export const BRANDS_BY_IDS = gql`
  query brands($IDArr: [ID]!) {
    brands(filters: {id: {in: $IDArr}}, pagination: { page: 1, pageSize: 100 }) {
     ${brandFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
