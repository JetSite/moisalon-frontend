import { imageInfo } from '../common/imageInfo'

export const vacancyFragment = `
data {
  id
  attributes {
      title
      slug
      publishedAt
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
`
