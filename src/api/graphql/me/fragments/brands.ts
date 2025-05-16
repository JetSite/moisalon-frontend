import { imageInfo } from '../../common/imageInfo'
import { promotionFragment } from '../../fragments/promotion'
import { reviewsFragment } from '../../fragments/reviews'

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
      promotions {
        ${promotionFragment}
      }
      reviews {
        ${reviewsFragment}
      }
  }
}`
