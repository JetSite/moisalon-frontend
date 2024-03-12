import AutosuggestField from "./AutosuggestField";
import { useAddressSuggestions } from "./useAddressSuggestions";
import Map from "../../Map";
import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../styles/variables";

const AutosuggestFieldStyled = styled(AutosuggestField)`
  .MuiInputBase-inputMultiline {
    font-size: 16px;
  }

  .MuiInputLabel-root {
    font-size: 14px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    .MuiInputBase-inputMultiline {
      font-size: 14px;
      font-weight: 500;
      line-height: 25px;
    }
  }
`;

const AddressWrap = styled.div`
  position: relative;
  width: 100%;
  min-height: 345px;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 180px;
  }
`;

const MapWrap = styled.div`
  padding-top: 20px;
  width: 100%;
`;

const AddressNoSalonField = ({
  label = "Адрес",
  fullWidth = true,
  salonId = null,
  ...rest
}) => {
  const { suggestions } = useAddressSuggestions(rest.input.value);
  const { coordinates } = useAddressSuggestions(rest.input.value, 1);
  const address = {
    longitude: coordinates.geoLon,
    latitude: coordinates.geoLat,
  };
  return (
    <AddressWrap>
      <AutosuggestFieldStyled
        {...rest}
        fullWidth={fullWidth}
        label={label}
        suggestions={suggestions}
      />
      {!rest.noMap ? (
        <MapWrap>
          <Map address={address} />
        </MapWrap>
      ) : null}
    </AddressWrap>
  );
};

export default AddressNoSalonField;
