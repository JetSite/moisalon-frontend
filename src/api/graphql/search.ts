import { gql } from '@apollo/client'
import { searchSalonFragment } from './fragments/serch/salon'
import { searchMasterFragment } from './fragments/serch/master'
import { searchBrandFragment } from './fragments/serch/brand'

export const SEARCH = gql`
  query search($searchValue: String!, $rent: Boolean) {
    search(query: $searchValue) {
      salons(filters: { rent: { eq: $rent } }) {
          ${searchSalonFragment}
      }
      masters {
          ${searchMasterFragment}
      }
      brands {
          ${searchBrandFragment}
      }
    }
  }
`
