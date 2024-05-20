import { cityInfo } from '../../common/cityInfo'
import { imageInfo } from '../../common/imageInfo'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import servicesFragment from '../../fragments/services'

export const masterFragment = `data {
  id
  attributes {
      masterName
      masterPhone
      masterEmail
      reviewsCount
      ratingCount
      rating
      salons {
        data {
          id
          attributes {
              salonName
          }
        }
      }
      services {
          ${servicesFragment}
      }
      city {
        ${cityInfo}
      }
      masterPhoto {
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
