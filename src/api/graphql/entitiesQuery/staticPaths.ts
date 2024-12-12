import { gql } from '@apollo/client'
import { cityFragment } from '../fragments/city'

export const entityFragment = `
    id
    attributes {
      city {
       ${cityFragment}
      }
    }

`

export const SALONS_STATIC_PATH = gql`
  query salons($slug: String!, $itemsCount: Int) {
    salons(
      filters: { city: { slug: { eq: $slug } } }
      pagination: { page: 1, pageSize: $itemsCount }
    ) {
      data {
       ${entityFragment}
      }
    }
  }
`

export const BRANDS_STATIC_PATH = gql`
  query brands($slug: String!, $itemsCount: Int) {
    brands(
      filters: { city: { slug: { eq: $slug } } }
      pagination: { page: 1, pageSize: $itemsCount }
    ) {
      data {
       ${entityFragment}
      }
    }
  }
`

export const MASTERS_STATIC_PATH = gql`
  query masters($slug: String!, $itemsCount: Int) {
    masters(
      filters: { city: { slug: { eq: $slug } } }
      pagination: { page: 1, pageSize: $itemsCount }
    ) {
      data {
       ${entityFragment}
      }
    }
  }
`

export const RENT_STATIC_PATH = gql`
  query salons($slug: String!, $itemsCount: Int) {
    salons(
      filters: {city:{slug:{eq:$slug }}, and: [{workplacesCount: {gt: 0}}, {rent: {eq: true}}]},
      pagination: { page: 1, pageSize: $itemsCount }
    ) {
      data {
       ${entityFragment}
      }
    }
  }
`
