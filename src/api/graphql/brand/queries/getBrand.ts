import { gql } from '@apollo/client'
import { brandFragment } from '../../fragments/brand'

export const BRAND = gql`
  query brand($id: ID!) {
    brand(id: $id) {
      ${brandFragment}
    }
  }
`
