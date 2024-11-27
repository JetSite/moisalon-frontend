import { imageInfo } from '../../common/imageInfo'
import { cityFragment } from '../city'
import { salonServicesFragment } from '../../salon/fragments'

export const searchSalonFragment = `data {
  id
  attributes {
      name
      latitude
      longitude
      locationDirections
      rating
      ratingCount
      reviewsCount
      city {
        ${cityFragment}
      }
      user {
        data {
          id
        }
      }
      activities {
          data {
            id
            attributes {
              title
            }
          }
        }
      address    
      rent
      email
      salonPhones {
        phoneNumber
       
      }
      cover {
        ${imageInfo}
      }
      services {
      ${salonServicesFragment}
      }
  }
}`
