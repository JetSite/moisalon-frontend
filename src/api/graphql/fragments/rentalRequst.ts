import { imageInfo } from '../common/imageInfo'
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
          phone
          email
          avatar {
            ${imageInfo}
          }
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
    communication_types {
      data {
        id
        attributes {
          title
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
