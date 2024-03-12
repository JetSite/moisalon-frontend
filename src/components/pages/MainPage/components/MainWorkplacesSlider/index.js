import { useContext } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { salonQuery } from "../../../../../_graphql-legacy/salon/salonQuery";
import catalogOrDefault from "../../../../../utils/catalogOrDefault";
import { CatalogsContext } from "../../../../../searchContext";
import Slider from "../../../../blocks/Slider";

const MainWorkplacesSlider = ({ me }) => {
  let cityInStorage;
  if (typeof window !== "undefined") {
    cityInStorage = localStorage.getItem("citySalon");
  }

  const { data, loading } = useQuery(salonQuery, {
    variables: { id: "60d1ec4b10f3540001a9d723", filterDefinition: "" },
  });

  const allRooms = [];

  data?.salon?.rooms?.forEach((room) => {
    room?.seats.forEach((seat) => {
      allRooms.push(seat);
    });
  });

  return (
    <Slider
      type="rentWorkplaces"
      noScroll
      loading={loading}
      items={allRooms || []}
      title="АРЕНДА РАБОЧИХ МЕСТ"
      bgColor="#000"
      pt={40}
      pb={60}
      salon={data?.salon}
      isCityChangeable
      mobileTitleWidth
      noPadding
      pl={20}
    />
  );
};

export default MainWorkplacesSlider;
