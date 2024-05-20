import { imageInfo } from '../../common/imageInfo'
import { brandsFragment } from './brands'
import { salonFragment } from './salon'

export const vacanciesFragment = `
data {
  id
  attributes {
    slug
    shortDescription
    fullDescription
    requirements
    conditions
    vacancy_type {
      data {
        id
        attributes {
          title
        }
      }
    }
    brand {
      ${brandsFragment}
    }
    salon {
      ${salonFragment}
    }
    title
    deleted
    slug
    cover {
      ${imageInfo}
    }
  }
}`
