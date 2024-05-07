import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'

export const getBrand = gql`
  query brand($id: ID!) {
    brand(id: $id) {
      data {
        id
        attributes {
          brandName
          brandLogo {
            ${imageInfo}
          }
          salons {
            data {
              id
              attributes {
                salonName
                salonAddress
                salonPhones {
                    phoneNumber
                }
                salonLogo {
                    ${imageInfo}
                }
                salonCover {
                    ${imageInfo}
                }
              }
            }
          }
          products {
            data {
              id
              attributes {
                  productName
                  productShortDescription
                  productFullDescription
                  productPrice
                  productSalePrice
                  productAvailableInStock
                  productSKU
                  productCover {
                    ${imageInfo}
                  }
              }
            }
          }
          masters {
            data {
              id
              attributes {
                masterName
                masterPhoto {
                  ${imageInfo}
                }
                averageScore
                numberScore
                serviceCategories {
                  id
                  category {
                      data {
                          id
                          attributes {
                              serviceCategoryName
                          }
                      }
                  }
                  services {
                      id
                      serviceName 
                      price
                  }
                }
              }
            }
          }
          averageScore
          numberScore
          address
          description
          email
          seoTitle
          seoDescription
          slug
          reviews {
            data {
                id
                attributes {
                    reviewTitle
                    reviewContent
                    user {
                        data {
                            id
                            attributes {
                                username
                                email
                                phone
                            }
                        }
                    }
                }
            }
        }
          minimalOrderPrice
          manufacture
          history
          termsDeliveryPrice
          socialNetworks {
            id
            title
            link
            s_network {
                data {
                    id
                    attributes {
                        title
                        logo {
                            ${imageInfo}
                        }
                        slug
                    }
                }
            }
        }
          phones {
            phoneNumber
            phoneTitle
            phoneContact
            haveWhatsApp
            haveViber
            haveTelegram
          }
          user {
            data {
              id
              attributes {
                username
                email
              }
            }
          }
          office
          latitude
          longitude
          photos {
            ${imageInfo}
          }
        }
      }
    }
  }
`
