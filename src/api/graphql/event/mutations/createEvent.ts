import { gql } from '@apollo/client'
import { eventFragment } from '../fragments/eventFragment'

export const CREATE_EVENT = gql`
  mutation createEvent($input: EventInput!) {
    createEvent(data: $input) {
      ${eventFragment}
    }
  }
`
