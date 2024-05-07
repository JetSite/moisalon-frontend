import { imageInfo } from '../../common/imageInfo'

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
      data {
        id
        attributes {
          brandName
        }
      }
    }
    salon {
      data {
        id
        attributes {
          salonName
        }
      }
    }
    title
    deleted
    slug
    cover {
      ${imageInfo}
    }
  }
}`
