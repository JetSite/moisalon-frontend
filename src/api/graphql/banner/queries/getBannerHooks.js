import { gql } from "@apollo/client";
import { imageInfo } from "../../common/imageInfo";

export const getBannerHooks = gql`
  query bannerHooks {
		bannerHooks {
			data {
				id
				attributes {
					hookName
					banners {
						data {
							id
							attributes {
									bannerName
									bannerImage {
										${imageInfo}
									}
							}
						}
					}
				}
			}
		}
  }
`;
