import { sNetworksFragment } from './sNetworks'

export const socialNetworksFragment = `
id
s_network {
  ${sNetworksFragment}
  }
link
title
`
