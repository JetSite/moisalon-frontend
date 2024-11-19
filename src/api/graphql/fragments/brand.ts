import { imageInfo } from '../common/imageInfo'
import { masterFragment } from '../me/fragments/master'
import { salonFragment } from '../me/fragments/salon'
import { vacanciesFragment } from '../me/fragments/vacancies'
import { productFragment } from '../product/fragment/product'
import { cityFragment } from './city'
import { countryFragment } from './country'
import { phonesFragment } from './phones'
import { ratingsFragment } from './ratings'
import { reviewsFragment } from './reviews'
import { socialNetworksFragment } from './socialNetworks'

export const brandFragment = `
      data {
        id
        attributes {
          name
          slug
          seoTitle
          seoDescription
          description
          address
          name
          history
          rating
          ratingCount
          reviewsCount
          email
          office
          latitude
          longitude
          manufacture
          minimalOrderPrice
          termsDeliveryPrice
          webSiteUrl
          socialNetworks {
            ${socialNetworksFragment}
          }
          vacancies {
            ${vacanciesFragment}
          }
          reviews {
            ${reviewsFragment}
          }
          ratings {
            ${ratingsFragment}
          }
          masters {
            ${masterFragment}
          }
          photos {
            ${imageInfo}
          }
          city {
            ${cityFragment}
          }
          logo {
            ${imageInfo}
          }
          salons {
            ${salonFragment}
          }
          country {
            ${countryFragment}
          }
          products {
            ${productFragment}
          }
          phones {
           ${phonesFragment}
        }
      }
    }
`
