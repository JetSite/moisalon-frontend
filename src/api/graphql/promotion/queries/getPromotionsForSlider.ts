import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'

export const PROMOTIONS_FOR_SLIDER = gql`
  query promotions {
    promotions(pagination: { pageSize: 6 }) {
            data {
              id
              attributes {
                  title
                  slug
                  cover {
                      ${imageInfo}
                  }
                  master {
                    data {
                      id
                      attributes {
                        phone
                        address
                        email
                      }
                    }
                  }
                  salon {
                    data {
                      id
                      attributes {
                        address
                        email
                        salonPhones {
                            id
                              phoneNumber
                        }
                      }
                    }
                  }
                  brand {
                    data {
                      id
                      attributes {
                        address
                        email
                        phones {
                            id
                            phoneNumber
                          }
                      }
                    }
                  }
              }
            }
    }
  }
`
