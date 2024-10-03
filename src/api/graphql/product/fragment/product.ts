import { imageInfo } from '../../common/imageInfo'
import { metaInfo } from '../../common/metaInfo'
import { brandsFragment } from '../../fragments/brands'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
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
      ${brandsFragment}
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
