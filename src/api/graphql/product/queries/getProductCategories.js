import { gql } from "@apollo/client";
import { metaInfo } from "../../common/metaInfo";
import { imageInfo } from "../../common/imageInfo";

export const getProductCategories = gql`
  query productCategories {
    productCategories(pagination: { page: 1, pageSize: 100 }) {
      data {
        id
        attributes {
            productCategoryName
            products {
              data {
                id
                attributes {  
                    productName
                    productShortDescription
                    productFullDescription
                    productPrice
                    productSalePrice
                    productAvailableInStock
                    productCover {
                      ${imageInfo}
                    }
                    brands {
                      data {
                        id
                        attributes {
                            brandName
                        }
                      }
                    }
                    attributes {
                      id
                      attr_group {
                        data {
                          id
                          attributes {
                              attributeGroupName
                              attributeGroupType
                              attr_values {
                                data {
                                  id
                                  attributes {
                                      attributeValueName
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
      ${metaInfo}
    }
  }
`;
