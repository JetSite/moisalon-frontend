import { imageInfo } from '../../common/imageInfo'

export const eventFragment = `
      data {
        id
        attributes {
            title
            slug
            address
            dateStart
            dateEnd
            deleted
            shortDescription
            fullDescription
            isPublished
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
