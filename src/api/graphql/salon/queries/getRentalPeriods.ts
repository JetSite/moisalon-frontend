import { gql } from '@apollo/client'
import { rentalPeriodFragment } from '../../fragments/rentalPeriod'

export const RENTAL_PERIODS = gql`
  query rentalPeriods {
    rentalPeriods {
      ${rentalPeriodFragment}
    }
  }
`
