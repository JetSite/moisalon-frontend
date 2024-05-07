import { imageInfo } from '../../common/imageInfo'

export const brandsFragment = `
data {
  id
  attributes {
      brandName
      brandLogo {
        ${imageInfo}
      }
      city {
        data {
          id
          attributes {
            cityName
            citySlug
          }
        }

      }
  }
}`
