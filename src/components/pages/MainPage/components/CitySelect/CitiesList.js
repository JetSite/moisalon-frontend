import React from "react";
import { CitiesListWrapper, CityItem } from "./styles";

const CitiesList = ({ cities, cityClickHandler }) => {
  return (
    <CitiesListWrapper>
      {cities.map((city, i) => {
        return (
          <CityItem key={i} onClick={() => cityClickHandler(i)}>
            {city}
          </CityItem>
        );
      })}
    </CitiesListWrapper>
  );
};

export default CitiesList;
