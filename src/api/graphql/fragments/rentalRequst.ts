import { salonWorkplacesFragment } from '../salon/fragments/salonWorkplaces'
import { onlyTitleFragment } from './onlyTitle'

export const rentalRequstFragment = `
data {
  id
  attributes {
    title
    slug
    contacts
    comment
    dateAt
    dateTo
    createdAt
    publishedAt
    workplace {
      ${salonWorkplacesFragment}
    }
    user {
      data {
        id
        attributes {
          username
        }
      }
    }
    salon {
      data {
        id
        attributes {
          name
        }
      }
    }
    status {
     ${onlyTitleFragment}
    }
    type {
      ${onlyTitleFragment}
    }
  }
}
`
