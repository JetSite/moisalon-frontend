import { useQuery } from "@apollo/client";
import { salonsRandom } from "../../../../../_graphql-legacy/salon/salonsRandom";
import Slider from "../../../../blocks/Slider";

const MainSalonsSlider = ({ rent, me }) => {
  let cityInStorage;
  if (typeof window !== "undefined") {
    cityInStorage = localStorage.getItem("citySalon");
  }
  const { data: salons, loading } = useQuery(salonsRandom, {
    variables: {
      count: 10,
      lessor: rent ? true : false,
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
      type="salons"
      loading={loading}
      items={salons?.salonsRandom || []}
      title="Салоны красоты"
      bgColor="#000"
      pt={102}
      pb={91}
      isCityChangeable
      noPadding
      pl={20}
    />
  );
};

export default MainSalonsSlider;
