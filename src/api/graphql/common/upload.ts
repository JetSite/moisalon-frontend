import { gql } from '@apollo/client'

export const UPLOAD = gql`
  mutation ($file: Upload!) {
    upload(file: $file) {
      data {
        id
        attributes {
          name
          alternativeText
          formats
          url
          previewUrl
        }
      }
    }
  }
`
