import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'
import { salonFragment } from '../fragments/salon'
import { masterFragment } from '../fragments/master'
import { brandsFragment } from '../fragments/brands'
import { vacanciesFragment } from '../fragments/vacancies'

export const getUser = gql`
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
            data {
              id
              attributes {
                cityName
                citySlug
              }
            }
          }
          selected_city {
          data {
            id
            attributes {
              cityName
              citySlug
            }
          }
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
          reviews {
            data {
              id
              attributes {
                reviewContent
                reviewTitle
                salons {
                  data {
                    id
                    attributes {
                      salonName
                    }
                  }
                }
                master {
                  data {
                    id
                    attributes {
                      masterName
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
                product {
                  data {
                    id
                    attributes {
                      productName
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
