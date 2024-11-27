import { cityInfo } from '../../common/cityInfo'
import { imageInfo } from '../../common/imageInfo'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import servicesFragment from '../../fragments/services'

export const searchMasterFragment = `data {
  id
  attributes {
      name
      phone
      email
      description
      reviewsCount
      ratingCount
      rating
      services {
          ${servicesFragment}
      }
      city {
        ${cityInfo}
      }
      photo {
        ${imageInfo}
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
