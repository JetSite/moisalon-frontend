import { useCitySuggestions } from "../../../../../pages/MainPage/components/CitySelect/useCitySuggestions";
import { Wrapper, CityList, CityItem } from "./styles";

const ProfileCitySelect = ({ cityInput, setShowCityInput, cityPopupRef }) => {
  const { suggestions } = useCitySuggestions(cityInput);
  const unicSuggestion = Array.from(new Set(suggestions));

  const cityClickHandler = (city) => {
    window.setFormValue("defaultCity", city);
    setShowCityInput(false);
  };

  return (
    <>
      {cityInput ? (
        <Wrapper ref={cityPopupRef}>
          {unicSuggestion.length === 0 && (
            <CityItem onClick={() => cityClickHandler(cityInput)}>
              {cityInput}
            </CityItem>
          )}
          <CityList>
            {unicSuggestion.map((city, i) => (
              <CityItem key={i} onClick={() => cityClickHandler(city)}>
                {city}
              </CityItem>
            ))}
          </CityList>
        </Wrapper>
      ) : null}
    </>
  );
};

export default ProfileCitySelect;
