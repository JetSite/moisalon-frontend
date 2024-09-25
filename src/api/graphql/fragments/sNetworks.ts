import { imageInfo } from '../common/imageInfo'

export const sNetworksFragment = `
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
`
