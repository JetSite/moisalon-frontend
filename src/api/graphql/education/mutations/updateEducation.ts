import { gql } from '@apollo/client'
import { educationFragment } from '../fragments/educationFragment'

export const UPDATE_EDUCATION = gql`
  mutation updateEducation($id: ID!, $input: EducationInput!) {
    updateEducation(id: $id, data: $input) {
      ${educationFragment}
    }
  }
`
