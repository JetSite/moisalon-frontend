import { gql } from '@apollo/client'
import servicesFragment from '../../fragments/services'
import { cityInfo } from '../../common/cityInfo'

export const CHANGE_ME = gql`
  mutation changeMe($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
        attributes {
          username
          birthDate
          email
          phone
          avatar {
            data {
              id
              attributes {
                url
              }
            }
          }
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
              attributes {
                name
                slug
              }
            }
          }
          selected_city {
            data {
              id
              attributes {
                name
                slug
              }
            }
          }
          masters {
            data {
              id
              attributes {
                name
                email
                phone
                description
                address
                searchWork
                services {
                  ${servicesFragment}
                }
                webSiteUrl
                haveTelegram
                haveViber
                haveWhatsApp
                photo {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
                city {
                  ${cityInfo}
                }
                resume {
                  data {
                    id
                    attributes {
                      title
                      content
                      specialization
                      age
                      workSchedule
                      salary
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
