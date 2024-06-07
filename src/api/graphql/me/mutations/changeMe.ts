import { gql } from '@apollo/client'
import servicesFragment from '../../fragments/services'
import { cityInfo } from '../../common/cityInfo'

export const changeMe = gql`
  mutation changeMe($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
        attributes {
          username
          email
          phone
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
                resumes {
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
