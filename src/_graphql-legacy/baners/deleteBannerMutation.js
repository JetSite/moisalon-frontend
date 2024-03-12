import { gql } from "@apollo/client";

export const deleteBannerMutation = gql`
  mutation DeletedRequestBanner($id: String!) {
    deletedRequestBanner(id: $id) {
      id
    }
  }
`;
