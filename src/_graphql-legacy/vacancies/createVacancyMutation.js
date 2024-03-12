import { gql } from "@apollo/client";

export const createVacancyMutation = gql`
  mutation createVacancyMutation($input: CreateVacanciesInput!) {
    createVacancies(input: $input) {
      id
    }
  }
`;
