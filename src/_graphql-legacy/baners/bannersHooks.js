import { gql } from "@apollo/client";

export const bannersByHookCodeQuery = gql`
  query BannersByHookCode($hookCode: String!) {
    bannersByHookCode(hookCode: $hookCode) {
      id
      photo(kind: "big") {
        id
        kind
        url
      }
      title
      titleLink
      link
      subTitle
    }
  }
`;
