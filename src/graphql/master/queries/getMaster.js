import { gql } from '@apollo/client'
import { imageInfo } from 'src/graphql/common/imageInfo'

export const getMaster = gql`
  query master($id: ID!) {
    master(id: $id) {
        data {
            id
            attributes {
                    masterName
                    masterPhone
                    masterEmail
                    salons {
                        data {
                            id
                            attributes {
                                    salonName
                                    salonAddress
                                    salonLogo {
                                        ${imageInfo}
                                    }
                                    salonCover {
                                        ${imageInfo}
                                    }
                            }
                        }
                    }
                    services {
                        id
                        price
                        serviceName 
                        service {
                          data {
                            id
                            attributes {
                                serviceName
                            }
                          }
                        }
                      }
                    city {
                        data {
                            id
                            attributes {
                                    cityName
                                    citySlug
                            }
                        }
                    }
                    masterPhoto {
                        ${imageInfo}
                    }
                    photosWorks {
                        ${imageInfo}
                    }
                    description
                    seoTitle
                    slug
                    seoDescription
                    photosDiploma {
                        ${imageInfo}
                    }
                    haveTelegram
                    haveViber
                    haveWhatsApp
                    masterAddress
                    latitude
                    longitude
                    office
                    webSiteUrl
                    onlineBookingUrl
                    socialNetworks {
                        id
                        title
                        link
                        s_network {
                            data {
                                id
                                attributes {
                                    title
                                    logo {
                                        ${imageInfo}
                                    }
                                    slug
                                }
                            }
                        }
                    }
                    averageScore
                    numberScore
                    experience
            }
        }
    }
  }
`
