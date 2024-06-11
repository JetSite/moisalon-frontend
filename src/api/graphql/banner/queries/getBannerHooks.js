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
									title
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
