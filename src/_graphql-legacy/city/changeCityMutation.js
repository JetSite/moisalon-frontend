import { gql } from "@apollo/client";

export const changeCityMutation = gql`
  mutation ChangeCityMutation($city: String) {
    changeCity(city: $city)
  }
`;
