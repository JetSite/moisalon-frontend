import { gql } from "@apollo/client";

export const removeUserSalonsMutation = gql`
  mutation ($ids: [ID]!, $masterId: ID!) {
    removeSalonToMasters(ids: $ids, masterId: $masterId)
  }
`;
