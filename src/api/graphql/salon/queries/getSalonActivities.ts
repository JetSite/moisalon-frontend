import { gql } from '@apollo/client'

export const GET_SALON_ACTIVITIES = gql`
  query salonActivities {
    salonActivities {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`
