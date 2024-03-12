import { gql } from "@apollo/client";

export const createBannerMutation = gql`
  mutation createRequestBanner($input: CreateRequestBannerInput!) {
    createRequestBanner(input: $input) {
      id
    }
  }
`;
