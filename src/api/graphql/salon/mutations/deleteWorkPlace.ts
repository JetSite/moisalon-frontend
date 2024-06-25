import { gql } from '@apollo/client'

export const DELETE_WORKPLACE = gql`
  mutation updateSalonWorkplace($id: ID!) {
    updateSalonWorkplace(id: $id, data: { publishedAt: null }) {
      data {
        id
        attributes {
          publishedAt
          updatedAt
          shareRent
          salon {
            data {
              id
              attributes {
                workplaces {
                  data {
                    id
                    attributes {
                      title
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
