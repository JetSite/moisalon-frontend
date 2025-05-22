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
import { phonesFragment } from '../../fragments/phones'
import { productFragment } from '../../product/fragment/product'
import { metaInfo } from '../../common/metaInfo'

export const BRANDS = gql`
  query brands($itemsCount: Int, $page: Int) {
    brands(pagination: { page: $page, pageSize: $itemsCount }) {
      data {
        id
        attributes {
          name
          logo {
            ${imageInfo}
          }
        }
      }
      meta {
        ${metaInfo}
      }
    }
  }
`
