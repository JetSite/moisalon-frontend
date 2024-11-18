import { imageInfo } from '../../common/imageInfo'

export const eventFragment = `
      data {
        id
        attributes {
            title
            slug
            address
            timeStart
            timeEnd
            dateStart
            dateEnd
            longitude
            latitude
            deleted
            shortDescription
            fullDescription
            isPublished
            publishedAt
            cover {
                ${imageInfo}
            }
            master {
              data {
                id
                attributes {
                  name
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
            brand {
              data {
                id
                attributes {
                  name
                }
              }
            }
            user {
              data {
                id
              }
            }
            seoTitle
            seoDescription
        }
      }
`
