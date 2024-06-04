import { gql } from '@apollo/client'
import servicesFragment from '../../fragments/services'
import { cityInfo } from '../../common/cityInfo'

export const UPDATE_MASTER = gql`
  mutation updateMaster($masteriId: ID!, $input: MasterInput!) {
    updateMaster(id: $masterId, data: $input) {
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
        }
      }
    }
  }
`
