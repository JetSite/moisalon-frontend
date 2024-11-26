import { imageInfo } from 'src/api/graphql/common/imageInfo'

export const promotionFragment = `
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
                  phone
                  address
                  email
                }
              }
            }
            salon {
              data {
                id
                attributes {
                  name
                  address
                  email
                  salonPhones {
                      id
                        phoneNumber
                  }
                }
              }
            }
            brand {
              data {
                id
                attributes {
                  name
                  address
                  email
                  phones {
                      id
                      phoneNumber
                    }
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
