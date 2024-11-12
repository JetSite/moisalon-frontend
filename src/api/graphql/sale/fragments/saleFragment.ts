import { imageInfo } from 'src/api/graphql/common/imageInfo'

export const saleFragment = `
      data {
        id
        attributes {
            title
            slug
            dateStart
            dateEnd
            deleted
            shortDescription
            fullDescription
            promoCode
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
