import AutosuggestField from './AutosuggestField'
import { useAddressSuggestions } from './useAddressSuggestions'
import Map from '../../Map'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import { FC, useEffect } from 'react'
import { TextFieldProps } from '@material-ui/core'
import { FieldInputProps } from 'react-final-form'

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
`

const AddressWrap = styled.div<{ noMap?: boolean }>`
  position: relative;
  width: 100%;
  min-height: ${({ noMap }) => (noMap ? '345px' : 'none')};

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 180px;
  }
`

const MapWrap = styled.div`
  padding-top: 20px;
  width: 100%;
`

export interface IAddressNoSalonFieldProps
  extends FieldInputProps<any, HTMLElement> {
  fullWidth?: boolean
  salonId?: string | null
  label: string
  noMap?: boolean
}

const AddressNoSalonField: FC<IAddressNoSalonFieldProps> = ({
  label = 'Адрес',
  fullWidth = true,
  salonId = null,
  view,
  ...rest
}) => {
  const { suggestions, coordinates } = useAddressSuggestions(rest.input.value)
  const address = {
    longitude: coordinates?.geoLon,
    latitude: coordinates?.geoLat,
  }

  useEffect(() => {
    rest.setClickCity(coordinates?.city)
    if (rest.setClickAddress) {
      rest.setClickAddress(coordinates)
    }
  }, [coordinates])

  return (
    <AddressWrap noMap={!rest.noMap}>
      <AutosuggestFieldStyled
        {...rest}
        fullWidth={fullWidth}
        label={label}
        suggestions={suggestions}
      />
      {!rest.noMap ? (
        <MapWrap>
          <Map view={view} address={address} />
        </MapWrap>
      ) : null}
    </AddressWrap>
  )
}

export default AddressNoSalonField
