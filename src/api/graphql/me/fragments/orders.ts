import { imageInfo } from '../../common/imageInfo'

export const ordersFragment = `
data {
      id
      attributes {
        title
        cartContent {
          id
          product {
            data {
              id
              attributes {
                name
                salePrice
                regularPrice
                brand {
                  data {
                    id
                    attributes {
                      name
                      address
                      phones {
                        id
                        phoneTitle
                        phoneNumber
                        haveViber
                        haveWhatsApp
                        haveTelegram
                      }
                    }
                  }
                }
                cover {
                  ${imageInfo}
                }
              }
            }        
          }
          quantity
        }
        order_status {
          data {
            id
            attributes {
              title
            }
          }
        }
        payment_method {
          data {
            id
            attributes {
              title
            }
          }
        }
        comment
        address {
          data {
            id
            attributes {
              city 
              address
              zipCode
            }
          }
        }
        createdAt
      }
    }`
