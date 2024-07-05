import { onlyTitleFragment } from './onlyTitle'

export const equipmentFragment = `
data {
  id
  attributes {
    title
    category {
      ${onlyTitleFragment}
    }
  }
}
`
