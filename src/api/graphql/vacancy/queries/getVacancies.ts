import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'

export const getVacancies = gql`
  query vacancies {
    vacancies(pagination: { pageSize: 100 }) {
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
                        brandName
                    }
                }
            }
            salon {
                data {
                    id
                    attributes {
                        salonName
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
      meta {
        ${metaInfo}
      }
    }
  }
`
