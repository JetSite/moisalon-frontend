import { gql } from '@apollo/client'

export const totalMasters = gql`
  query totalMasters {
    masters {
      meta {
        pagination {
          total
        }
      }
    }
  }
`
