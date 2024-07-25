import { gql } from '@apollo/client'
import { eventFragment } from '../fragments/eventFragment'

export const getEventById = gql`
  query event($id: ID!) {
    event(id: $id) {
      ${eventFragment}
    }
  }
`
