import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import { educationFragment } from '../fragments/educationFragment'

export const getEducationById = gql`
  query education($id: ID!) {
    education(id: $id) {
      ${educationFragment}
    }
  }
`
