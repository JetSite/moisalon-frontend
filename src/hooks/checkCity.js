import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  CityContext,
  MeContext,
  SearchMainQueryContext,
} from "../searchContext";
import { cyrToTranslit } from "../utils/translit";
import { useQuery, useMutation } from "@apollo/client";
import { currentUserSalonsAndMasterQuery } from "../_graphql-legacy/master/currentUserSalonsAndMasterQuery";
import { changeCityMutation } from "../_graphql-legacy/city/changeCityMutation";

const useCheckCity = (cityData) => {
  const router = useRouter();
  const [city, setCity] = useContext(CityContext);
  const [query, setQuery] = useContext(SearchMainQueryContext);
  const [me, setMe] = useContext(MeContext);

  const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
    skip: true,
    onCompleted: (res) => {
      setMe({
        info: res?.me?.info,
        master: res?.me?.master,
        locationByIp: res?.locationByIp,
        salons: res?.me?.salons,
        rentalRequests: res?.me?.rentalRequests,
      });
    },
  });

  const [changeCityFunc] = useMutation(changeCityMutation, {
    onCompleted: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        localStorage.getItem("citySalon") !== cityData ||
        (localStorage.getItem("citySalon") === "Москва" &&
          router?.query?.city !== "moskva")
      ) {
        localStorage.setItem("citySalon", cityData);
        changeCityFunc({
          variables: {
            city: cityData,
          },
        });
        setCity(cityData);
        setQuery({ ...query, city: cityData });
        if (router?.query?.city !== "moskva" && cityData === "Москва") {
          router.replace({
            query: { ...router.query, city: cyrToTranslit(cityData) },
          });
        }
      }
    }
  }, []);
};

export default useCheckCity;
