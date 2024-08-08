import { gql } from '@apollo/client'
import servicesFragment from '../../fragments/services'
import { cityInfo } from '../../common/cityInfo'
import { socialNetworksFragment } from '../../fragments/socialNetworks'
import { imageInfo } from '../../common/imageInfo'

export const CREATE_BRAND = gql`
  mutation createBrand($input: BrandInput!) {
    createBrand(data: $input) {
      data {
        id
        attributes {
          name
          slug
          logo {
            ${imageInfo}
          }
        }
      }
    }
  }
`