import { gql } from "@apollo/client";

export const addUserSalonsMutation = gql`
  mutation ($ids: [ID]!, $masterId: ID!) {
    addSalonToMasters(ids: $ids, masterId: $masterId)
  }
`;
