import { gql } from '@apollo/client'
import { imageInfo } from '../../common/imageInfo'

export const getBannerHooks = gql`
  query bannerHooks {
		bannerHooks {
			data {
				id
				attributes {
					title
					name
					banners {
						data {
							id
							attributes {
									title
									bannerName
									bannerImage {
										${imageInfo}
									}
									linkText
									linkUrl
							}
						}
					}
				}
			}
		}
  }
`
