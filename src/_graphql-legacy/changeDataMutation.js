import { gql } from "@apollo/client";

export const changeDataMutation = gql`
  mutation ChangeDataMutation($input: UserDataInput!) {
    changeData(input: $input)
  }
`;
