export const attributesAttrValueFragment = `
id
attributeName
attr_value {
  data {
    id
    attributes {
      attributeValueName
      attr_groups {
        data {
          id
          attributes {
            attributeGroupName
            attributeGroupType
          }
        }
      }
    }
  }
}
`
