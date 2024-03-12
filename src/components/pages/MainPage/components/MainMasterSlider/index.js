import { useContext } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { mastersRandomQuery } from "../../../../../_graphql-legacy/mastersRandomQuery";
import catalogOrDefault from "../../../../../utils/catalogOrDefault";
import { CatalogsContext } from "../../../../../searchContext";
import Slider from "../../../../blocks/Slider";

const MainMasterSlider = ({ me }) => {
  let cityInStorage;
  if (typeof window !== "undefined") {
    cityInStorage = localStorage.getItem("citySalon");
  }
  const catalogs = useContext(CatalogsContext);

  const masterSpecializationsCatalog = catalogOrDefault(
    catalogs?.masterSpecializationsCatalog
  );

  const { data: masters, loading } = useQuery(mastersRandomQuery, {
    variables: {
      count: 10,
      city:
        me && me?.info && me?.info?.city
          ? me?.info?.city
          : cityInStorage
          ? cityInStorage
          : "",
    },
  });

  return (
    <Slider
      type="masters"
      noScroll
      loading={loading}
      items={masters?.mastersRandom || []}
      title="Бьюти-мастера"
      catalog={masterSpecializationsCatalog}
      bgColor="#f2f0f0"
      pt={102}
      pb={91}
      noPadding
      pl={20}
    />
  );
};

export default MainMasterSlider;
