import { gql } from '@apollo/client'

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
          region {
            data {
              id
              attributes {
                cityName
              }
            }
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
