import { useContext } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { salesSearch } from "../../../../../_graphql-legacy/sales/salesSearch";
import catalogOrDefault from "../../../../../utils/catalogOrDefault";
import { CatalogsContext } from "../../../../../searchContext";
import Slider from "../../../../blocks/Slider";

const MainAdsSlider = ({ me }) => {
  let cityInStorage;
  if (typeof window !== "undefined") {
    cityInStorage = localStorage.getItem("citySalon");
  }

  const { data, loading } = useQuery(salesSearch, {
    variables: { query: "" },
  });

  return (
    <Slider
      type="ads"
      noScroll
      loading={loading}
      items={data?.salesSearch?.connection?.nodes || []}
      title="BEAUTY-ОБЪЯВЛЕНИЯ"
      bgColor="#000"
      pt={70}
      pb={60}
      isCityChangeable
      mobileTitleWidth
      noPadding
      pl={20}
    />
  );
};

export default MainAdsSlider;
