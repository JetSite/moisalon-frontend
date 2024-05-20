import { imageInfo } from '../../common/imageInfo'
import { brandsFragment } from '../../fragments/brands'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import { attributesAttrValueFragment } from './attributesAttrValue'
import { poductCategoryFragment } from './productCategory'

export const productFragment = `
data {
  id
  attributes {
    productName
    productSKU
    productPrice
    productBarcode
    productSalePrice
    productFullDescription
    productShortDescription
    productAvailableInStock
    product_categories {
      ${poductCategoryFragment}
    }
    brand {
      ${brandsFragment}
    }
    productCover {
      ${imageInfo}
    }
    productGallery {
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
