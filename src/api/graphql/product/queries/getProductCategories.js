import { gql } from '@apollo/client'
import { metaInfo } from '../../common/metaInfo'
import { imageInfo } from '../../common/imageInfo'

export const getProductCategories = gql`
  query productCategories {
    productCategories(pagination: { page: 1, pageSize: 100 }) {
      data {
        id
        attributes {
            title
            products {
              data {
                id
                attributes {  
                    name
                    shortDescription
                    fullDescription
                    regularPrice
                    salePrice
                    availableInStock
                    cover {
                      ${imageInfo}
                    }
                    brands {
                      data {
                        id
                        attributes {
                            name
                        }
                      }
                    }
                    attributes {
                      id
                      attr_group {
                        data {
                          id
                          attributes {
                              title
                              attributeGroupType
                              attr_values {
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
        }
      }
      meta {
        ${metaInfo}
      }
    }
  }
`
