import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'

export const getVacancyById = gql`
  query vacancy($id: ID!) {
    vacancy(id: $id) {
      data {
        id
        attributes {
            title
            slug
            cover {
                ${imageInfo}
            }
            deleted
            vacancy_type {
                data {
                    id
                    attributes {
                        title
                    }
                }
            }
            shortDescription
            fullDescription
            brand {
                data {
                    id
                    attributes {
                        name
                    }
                }
            }
            salon {
                data {
                    id
                    attributes {
                        name
                    }
                }
            }
            requirements
            conditions
            amountFrom
            amountTo
            createdAt
        }
      }
    }
  }
`
