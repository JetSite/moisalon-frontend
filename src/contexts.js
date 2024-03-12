import { createContext } from "react";
export const DefaultCity = {
  city: "Москва",
};

export const DefaultCityContext = createContext({
  city: DefaultCity,
});

