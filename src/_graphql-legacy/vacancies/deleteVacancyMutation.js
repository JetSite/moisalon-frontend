import { gql } from "@apollo/client";

export const deleteVacancyMutation = gql`
  mutation ($input: DeleteVacanciesInput!) {
    deletedVacancies(input: $input) {
      id
      deleted
    }
  }
`;
