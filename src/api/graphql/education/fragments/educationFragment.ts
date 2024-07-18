import { imageInfo } from '../../common/imageInfo'

export const educationFragment = `
      data {
        id
        attributes {
            title
            slug
            averageScore
            dateStart
            dateEnd
            deleted
            shortDescription
            fullDescription
            isPublished
            numberScore
            cover {
                ${imageInfo}
            }
            sumScore
            amount
        }
      }
`
