import { imageInfo } from '../../common/imageInfo'
import { cityFragment } from '../../fragments/city'
import { countryFragment } from '../../fragments/country'
import { phonesFragment } from '../../fragments/phones'
import { ratingsFragment } from '../../fragments/ratings'
import { reviewsFragment } from '../../fragments/reviews'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import { salonFragment } from '../../me/fragments/salon'

export const brandForProductFragment = `
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
          reviews {
            ${reviewsFragment}
          }
          ratings {
            ${ratingsFragment}
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
          phones {
           ${phonesFragment}
        }
      }
    }
`
