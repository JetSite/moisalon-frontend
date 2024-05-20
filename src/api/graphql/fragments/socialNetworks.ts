import { imageInfo } from '../common/imageInfo'

export const socialNetworksFragment = `
id
s_network {
  data {
    id
    attributes {
      title
      logo {
        ${imageInfo}
      }
      slug
    }
  }
}
link
title
`
