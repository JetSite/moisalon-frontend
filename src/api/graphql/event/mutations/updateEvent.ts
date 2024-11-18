import { gql } from '@apollo/client'
import { eventFragment } from '../fragments/eventFragment'

export const UPDATE_EVENT = gql`
  mutation updateEvent($id: ID!, $input: EventInput!) {
    updateEvent(id: $id, data: $input) {
      ${eventFragment}
    }
  }
`
