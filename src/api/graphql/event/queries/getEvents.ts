import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'
import { eventFragment } from '../fragments/eventFragment'

export const getEvents = gql`
  query events {
    events(pagination: { pageSize: 100 }) {
      ${eventFragment}
      meta {
        ${metaInfo}
      }
    }
  }
`
