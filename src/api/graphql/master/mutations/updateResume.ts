import { gql } from '@apollo/client'
import { cityFragment } from '../../fragments/city'

export const UPDATE_RESUME = gql`
  mutation updateResume($resumeId: ID!, $input: MasterResumeInput!) {
    updateMasterResume(id: $resumeId, data: $input) {
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
