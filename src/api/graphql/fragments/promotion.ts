import { imageInfo } from '../common/imageInfo'

export const promotionFragment = `
data {
  id
  attributes {
    title
    slug
    cover {
      ${imageInfo}
    }
    fullDescription
    shortDescription
    salon {
      data {
        id
        attributes {
          name
        }
      }
    }
    master {
      data {
        id
        attributes {
          name
        }
      }
    }
    brand {
      data {
        id
        attributes {
          name
        }
      }
    }
    seoTitle
    seoDescription
    dateStart
    dateEnd
    deleted
    user {
      data {
        id
        attributes {
          username
        }
      }
    }
    value
    publishedAt
  }
}
`
