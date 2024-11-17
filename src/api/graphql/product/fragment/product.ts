import { imageInfo } from '../../common/imageInfo'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import { brandForProductFragment } from './brandForProduct'
import { attributesAttrValueFragment } from './attributesAttrValue'
import { poductCategoryFragment } from './productCategory'

export const productFragment = `
data {
  id
  attributes {
    name
    sku
    regularPrice
    barcode
    salePrice
    fullDescription
    shortDescription
    availableInStock
    product_categories {
      ${poductCategoryFragment}
    }
    brand {
      ${brandForProductFragment}
    }
    cover {
      ${imageInfo}
    }
    gallery {
      ${imageInfo}
    }
    attributes {
      ${attributesAttrValueFragment}
    }
    ratings {
      ${ratingsFragment}
    }
    reviews {
      ${reviewsFragment}
    }
  }
}
`
