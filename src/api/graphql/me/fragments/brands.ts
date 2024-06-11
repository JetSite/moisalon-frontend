import { imageInfo } from '../../common/imageInfo'

export const brandsFragment = `
data {
  id
  attributes {
      name
      logo {
        ${imageInfo}
      }
      city {
        data {
          id
          attributes {
            name
            slug
          }
        }

      }
  }
}`
