import { cityInfo } from '../../common/cityInfo'
import { imageInfo } from '../../common/imageInfo'
import { ratingsFragment } from '../ratings'
import { reviewsFragment } from '../reviews'
import servicesFragment from '../services'

export const searchMasterFragment = `data {
  id
  attributes {
      name
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
