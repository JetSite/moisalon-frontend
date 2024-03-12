import { gql } from "@apollo/client";

export const requestBannerUser = gql`
  query requestBannerUser {
    requestBannerUser {
      id
      status
      requestComment
      adHeader
      adText
      adImage
    }
  }
`;
