import { gql } from '@apollo/client'
import { cityFragment } from '../../fragments/city'

export const CREATE_RESUME = gql`
  mutation createResume($input: MasterResumeInput!) {
    createMasterResume(data: $input) {
      data {
        id
        attributes {
          title
          content
          master {
            data {
              id
              attributes {
                name
              }
            }
          }
          specialization
          age
          workSchedule
          salary
          city {
            ${cityFragment}
          }
          gender {
            data {
              attributes {
                title
              }
            }
          }
          user {
            data {
              id
              attributes {
                username
              }
            }
          }
          createdAt
          publishedAt
        }
      }
    }
  }
`
