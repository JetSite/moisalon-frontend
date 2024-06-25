import { imageInfo } from '../../common/imageInfo'
import { paymentMethodsFragment } from '../../fragments/paymentMethods'
import { rentalPeriodFragment } from '../../fragments/rentalPeriod'

export const salonWorkplacesFragment = `
data{
  id
  attributes{
    title
    subRent
    shareRent
    rentalPeriod{
      id
      rentalCost
      rental_period{
        ${rentalPeriodFragment}
      }
    }
    workspaces_types{
      data{
        id
        attributes{
          workplaceType
        }
      }
    }
    gallery {
      ${imageInfo}
    }
    payment_methods{
     ${paymentMethodsFragment}
    }
  }
}
`
