import { gql } from '@apollo/client'
import { educationFragment } from '../fragments/educationFragment'

export const CREATE_EDUCATION = gql`
  mutation createEducation($input: EducationInput!) {
    createEducation(data: $input) {
      ${educationFragment}
    }
  }
`
