import { gql } from '@apollo/client';
import { searchSalonFragment } from './fragments/search/salon';
import { searchMasterFragment } from './fragments/search/master';
import { searchBrandFragment } from './fragments/search/brand';

export const SEARCH = gql`
  query search($searchValue: String!, $rent: Boolean, $slug: String) {
    search(query: $searchValue) {
      salons(filters: { rent: { eq: $rent },city:{slug:{eq:$slug }} }) {
          ${searchSalonFragment}
      }
      masters(filters: { city:{slug:{eq:$slug }} }) {
          ${searchMasterFragment}
      }
      brands {
          ${searchBrandFragment}
      },
    }
  }
`;
