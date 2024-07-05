import { gql } from '@apollo/client'

export const GET_SALON_ACTIVITIES = gql`
  query salonActivities {
    salonActivities(pagination: { pageSize: 50 }) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`
