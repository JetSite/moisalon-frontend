import { imageInfo } from '../../common/imageInfo'
import { equipmentFragment } from '../../fragments/equipment'
import { onlyTitleFragment } from '../../fragments/onlyTitle'
import { paymentMethodsFragment } from '../../fragments/paymentMethods'
import { rentalPeriodFragment } from '../../fragments/rentalPeriod'
import servicesFragment from '../../fragments/services'

export const salonWorkplacesFragment = `
data{
  id
  attributes{
    title
    subRent
    shareRent
    description
    wetPointsShower
    wetPointsHead
    wetPointsHands
    space
    floor
    withLicense
    isAvailableForRent
    hasWindows
    electricitySocketsUpsCount
    electricitySocketsExtendersCount
    electricitySocketsCount
    rentalPeriod {
      id
      rentalCost
      rental_period {
        ${rentalPeriodFragment}
      }
    }
    workspaces_types {
      data {
        id
        attributes {
          title
        }
      }
    }
    gallery {
      ${imageInfo}
    }
    cover {
      ${imageInfo}
    }
    payment_methods {
     ${paymentMethodsFragment}
    }
    equipment {
      ${equipmentFragment}
    }
    services {
      data {
        id
        attributes {
          title
          service_categories {
            ${onlyTitleFragment}
          }
        }
      }
    }
  }
}
`
