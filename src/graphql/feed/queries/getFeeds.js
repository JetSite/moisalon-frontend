import { gql } from "@apollo/client";
import { metaInfo } from "../../common/metaInfo";
import { imageInfo } from "../../common/imageInfo";

export const getFeeds = gql`
  query feeds {
    feeds {
      data {
        id
        attributes {
          beautyFeedTitle
          beautyFeedContent
          beautyFeedCover {
            ${imageInfo}
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
      ${metaInfo}
    }
  }
`;
