import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import { salonFragment } from '../../me/fragments/salon'
import { masterFragment } from '../../me/fragments/master'
import { cityFragment } from '../../fragments/city'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import { vacanciesFragment } from '../../me/fragments/vacancies'
import { reviewsFragment } from '../../fragments/reviews'
import { ratingsFragment } from '../../fragments/ratings'
import { countryFragment } from '../../fragments/country'
import { brandsFragment } from '../../fragments/brands'
import { phonesFragment } from '../../fragments/phones'
import { productFragment } from '../../product/fragment/product'

export const getBrand = gql`
  query brand($id: ID!) {
    brand(id: $id) {
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
  }
  }
`
