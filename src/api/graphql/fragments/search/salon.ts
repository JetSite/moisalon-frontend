import { imageInfo } from '../../common/imageInfo'
import { cityFragment } from '../city'
import { salonServicesFragment } from '../../salon/fragments'

export const searchSalonFragment = `data {
  id
  attributes {
      name
      rating
      ratingCount
      reviewsCount
      city {
        ${cityFragment}
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
      photos {
        ${imageInfo}
      }
      services {
        ${salonServicesFragment}
      }
  }
}`
