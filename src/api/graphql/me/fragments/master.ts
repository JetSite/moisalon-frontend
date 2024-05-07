import { cityInfo } from '../../common/cityInfo'
import { imageInfo } from '../../common/imageInfo'

export const masterFragment = `data {
  id
  attributes {
      masterName
      masterPhone
      masterEmail
      salons {
        data {
          id
          attributes {
              salonName
          }
        }
      }
      services {
          id
          service {
            data {
              id
              attributes {
                service_categories {
                  data {
                    id
                    attributes {
                      serviceCategoryName
                    }
                  }
                }
              }
            }
          }
          serviceName
      }
      city {
        ${cityInfo}
      }
      masterPhoto {
        ${imageInfo}
      }
  }
}`
