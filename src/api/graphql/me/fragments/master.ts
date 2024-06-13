import { cityInfo } from '../../common/cityInfo'
import { imageInfo } from '../../common/imageInfo'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import servicesFragment from '../../fragments/services'

export const masterFragment = `data {
  id
  attributes {
      name
      phone
      email
      description
      reviewsCount
      ratingCount
      rating
      salons {
        data {
          id
          attributes {
              name
          }
        }
      }
      services {
          ${servicesFragment}
      }
      city {
        ${cityInfo}
      }
      photo {
        ${imageInfo}
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
      resumes {
        data {
          id
          attributes {
            title
            content
            specialization
            age
            workSchedule
            salary
          }
        }
      }
  }
}
`
