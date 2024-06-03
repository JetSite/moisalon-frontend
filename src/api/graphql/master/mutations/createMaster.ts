import { gql } from '@apollo/client'
import servicesFragment from '../../fragments/services'

export const CREATE_MASTER = gql`
  mutation createMaster($input: MasterInput!) {
    createMaster(data: $input) {
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
        }
      }
    }
  }
`
