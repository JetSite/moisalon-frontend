import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Popup from "../../ui/Popup";
import Button from "../../ui/Button";
import { Box } from "@material-ui/core";
import { useCitySuggestions } from "../../pages/MainPage/components/CitySelect/useCitySuggestions";
import { changeCityMutation } from "../../../_graphql-legacy/city/changeCityMutation";
import CitiesList from "../../pages/MainPage/components/CitySelect/CitiesList";
import { Input } from "./styles";
import { useQuery } from "@apollo/client";
import { currentUserSalonsAndMasterQuery } from "../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery";
import { CityContext } from "../../../searchContext";
import { useRouter } from "next/router";
import { cyrToTranslit } from "../../../utils/translit";

const ChangeCityPopup = ({
  openPopup,
  handlePopupClose,
  me,
  setPopupOpen,
  setMeInfo,
}) => {
  const [changeCity, setChangeCity] = useState(false);
  const [cityInput, setCityInput] = useState();
  const [city, setCity] = useContext(CityContext);

  const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
    skip: true,
    onCompleted: (res) => {
      setMeInfo({
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

  const handleSubmit = () => {
    if (!me?.info) {
      localStorage.setItem(
        "citySalon",
        me?.info?.city
          ? me.info.city
          : localStorage.getItem("citySalon")
          ? localStorage.getItem("citySalon")
          : me?.locationByIp
          ? me.locationByIp.data.city
          : "Москва"
      );
      setPopupOpen(false);
    } else {
      changeCityFunc({
        variables: {
          city: me?.info?.city
            ? me.info.city
            : localStorage.getItem("citySalon")
            ? localStorage.getItem("citySalon")
            : me?.locationByIp
            ? me.locationByIp.data.city
            : "Москва",
        },
      });
      setPopupOpen(false);
    }
  };

  const handleClose = () => {
    handlePopupClose();
  };

  return (
    <Popup
      isOpen={openPopup}
      onClose={handleClose}
      title={
        changeCity ? "Выберите Ваш город" : "Вы находитесь в населенном пункте "
      }
      city={changeCity ? "" : `${city}`}
    >
      {!changeCity ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button onClick={handleClose} size="popUp" variant="red" font="popUp">
            Да
          </Button>
          <Button
            onClick={() => setChangeCity(true)}
            size="popUp"
            variant="darkTransparentWithoutBorder"
            font="popUp"
          >
            Нет, выбрать другой
          </Button>
        </Box>
      ) : (
        <>
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            {/* <Box marginBottom="20px">
              <input type="text" />
            </Box>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>

            </Box> */}
            <Box marginBottom="20px">
              <Input
                type="text"
                placeholder="Введите город"
                onChange={(e) => setCityInput(e.target.value)}
              />
              {cityInput && cityInput.length > 2 && (
                <CityList
                  cityInput={cityInput}
                  setMeInfo={setMeInfo}
                  handlePopupClose={handlePopupClose}
                />
              )}
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                }}
                size="popUp"
                variant="darkTransparentWithoutBorder"
                font="popUp"
              >
                Отмена
              </Button>
              {/* <Button
                onClick={handleSubmit}
                size="popUp"
                variant="red"
                font="popUp"
              >
                Выбрать
              </Button> */}
            </Box>
          </form>
        </>
      )}
    </Popup>
  );
};

export default ChangeCityPopup;

const CityList = ({ cityInput, handlePopupClose, setMeInfo }) => {
  const { suggestions } = useCitySuggestions(cityInput);
  const unicSuggestion = Array.from(new Set(suggestions));
  const [city, setCity] = useContext(CityContext);
  const router = useRouter();

  const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
    skip: true,
    onCompleted: (res) => {
      setMeInfo({
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

  const cityClickHandler = async (index) => {
    const city = unicSuggestion.find((city, i) => i == index);
    handlePopupClose();
    localStorage.setItem("citySalon", city ? city : "Москва");
    await changeCityFunc({
      variables: {
        city: city ? city : "Москва",
      },
    });
    setCity(city ? city : "Москва");
    if (router.pathname === "/[city]/salon/[id]" && router?.query?.city) {
      router.push(`/${cyrToTranslit(city)}/salon`);
      return;
    }
    if (
      router.pathname === "/[city]/brand/[id]/products" &&
      router?.query?.city
    ) {
      router.push(`/${cyrToTranslit(city)}/brand`);
      return;
    }
    if (router.pathname === "/[city]/rent/[id]" && router?.query?.city) {
      router.push(`/${cyrToTranslit(city)}/rent`);
      return;
    }
    if (
      router.pathname === "/[city]/rent/[id]room/[roomId]/seat/[seatId]" &&
      router?.query?.city
    ) {
      router.push(`/${cyrToTranslit(city)}/rent`);
      return;
    }
    if (router.pathname === "/[city]/master/[id]" && router?.query?.city) {
      router.push(`/${cyrToTranslit(city)}/master`);
      return;
    }
    if (router.pathname === "/[city]/brand/[id]" && router?.query?.city) {
      router.push(`/${cyrToTranslit(city)}/brand`);
      return;
    }
    if (router?.query?.city) {
      router.replace({ query: { ...router.query, city: cyrToTranslit(city) } });
    }
  };

  return (
    <CitiesList cities={unicSuggestion} cityClickHandler={cityClickHandler} />
  );
};
