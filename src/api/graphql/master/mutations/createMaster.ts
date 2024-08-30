import { gql } from '@apollo/client'
import servicesFragment from '../../fragments/services'
import { cityInfo } from '../../common/cityInfo'
import { resumeFragment } from '../../fragments/resume'

export const CREATE_MASTER = gql`
  mutation createMaster($input: MasterInput!) {
    createMaster(data: $input) {
      data {
        id
        attributes {
          publishedAt
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
            ${resumeFragment}
          }
        }
      }
    }
  }
`
