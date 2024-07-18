import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { educationFragment } from '../fragments/educationFragment'

export const getEducations = gql`
  query educations {
    educations(pagination: { pageSize: 100 }) {
      ${educationFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
