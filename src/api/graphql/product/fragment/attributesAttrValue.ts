export const attributesAttrValueFragment = `
id
attributeName
attr_value {
  data {
    id
    attributes {
      title
      attr_group {
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
`
