import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import { salonFragment } from '../fragments/salon'
import { masterFragment } from '../fragments/master'
import { brandsFragment } from '../fragments/brands'
import { vacanciesFragment } from '../fragments/vacancies'
import { cityFragment } from '../../fragments/city'
import { ordersFragment } from '../fragments/orders'

export const USER = gql`
  query usersPermissionsUser($id: ID) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          username
          phone
          email
          role {
            data {
              id
              attributes {
                name
              }
            }
          }
          city {
            ${cityFragment}
          }
          selected_city {
            ${cityFragment}
         }
          avatar {
            ${imageInfo}
          }
          salons {
            ${salonFragment}
          }
          favorited_salons {
            ${salonFragment}
          }
          masters {
            ${masterFragment}
          }
          favorited_masters {
            ${masterFragment}
          }
          brands {
            ${brandsFragment}
          }
          favorited_brands {
            ${brandsFragment}
          }
          vacancies {
            ${vacanciesFragment}
          }
          cart {
            data {
              id
              attributes {
                total
                cartContent {
                  id
                  product {
                    data {
                      id
                      attributes {
                        name
                        regularPrice
                        salePrice
                        fullDescription
                        shortDescription
                        availableInStock
                        cover {
                          ${imageInfo}
                        }
                        brand {
                          ${brandsFragment}
                        }
                      }
                    }
                  }
                  quantity
                }
              }
            }
          }
          orders {
            ${ordersFragment}
          }
          reviews {
            data {
              id
              attributes {
                content
                title
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
                product {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
