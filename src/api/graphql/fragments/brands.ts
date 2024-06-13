import { imageInfo } from '../common/imageInfo'
import { cityFragment } from './city'

export const brandsFragment = `
data {
  id
  attributes {
    city {
      ${cityFragment}
    }
      name
      logo {
        ${imageInfo}
      }
      
  }
}
`
