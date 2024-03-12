import { useContext } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { searchQuery } from "../../../../../_graphql-legacy/search/searchQuery";
import { EmptySearchQuery } from "../../../../../searchContext";
import catalogOrDefault from "../../../../../utils/catalogOrDefault";
import { CatalogsContext } from "../../../../../searchContext";
import Slider from "../../../../blocks/Slider";

const MainRentSlider = ({ me }) => {
  let cityInStorage;
  if (typeof window !== "undefined") {
    cityInStorage = localStorage.getItem("citySalon");
  }

  const { data, loading } = useQuery(searchQuery, {
    variables: {
      input: {
        ...EmptySearchQuery,
        city: cityInStorage || "",
        lessor: true,
        query: "",
      },
    },
  });

  return (
    <Slider
      type="rentSalons"
      noScroll
      loading={loading}
      items={data?.salonSearch?.salonsConnection?.nodes || []}
      title="АРЕНДА"
      bgColor="#000"
      pt={80}
      pb={60}
      isCityChangeable
      noPadding
      pl={20}
    />
  );
};

export default MainRentSlider;
