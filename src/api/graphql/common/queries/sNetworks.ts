import { gql } from '@apollo/client'
import { sNetworksFragment } from '../../fragments/sNetworks'

export const S_NETWORKS = gql`
  query sNetworks {
    sNetworks {
      ${sNetworksFragment}
      }
  }
`
