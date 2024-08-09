import { gql } from '@apollo/client'

export const UPDATE_BRAND = gql`
  mutation updateBrand($brandId: ID!, $input: BrandInput!) {
    updateBrand(id: $brandId, data: $input) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`
