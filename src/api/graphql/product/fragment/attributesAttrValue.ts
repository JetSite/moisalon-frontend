export const attributesAttrValueFragment = `
id
attributeName
attr_value {
  data {
    id
    attributes {
      title
      attr_groups {
        data {
          id
          attributes {
            title
            attributeGroupType
          }
        }
      }
    }
  }
}
`
