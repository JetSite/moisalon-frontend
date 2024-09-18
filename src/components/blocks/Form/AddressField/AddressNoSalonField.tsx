import AutosuggestField from './AutosuggestField'
import {
  IAddressSuggestion,
  useAddressSuggestions,
} from './useAddressSuggestions'
import Map from '../../Map'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import { FC, useEffect, useState } from 'react'
import { FieldRenderProps } from 'react-final-form'
import { ISetState } from 'src/types/common'

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
    min-height: ${({ noMap }) => (noMap ? '180px' : 'none')};
  }
`

const MapWrap = styled.div`
  padding-top: 20px;
  width: 100%;
`

export interface ICoordinate {
  longitude: number
  latitude: number
}

export interface IAddressNoSalonFieldProps
  extends Pick<FieldRenderProps<any, HTMLElement>, 'input' | 'meta'> {
  fullWidth?: boolean
  salonId?: string | null
  label: string
  noMap?: boolean
  view?: boolean
  setClickCity: ISetState<string | null>
  setClickAddress?: ISetState<IAddressSuggestion | null>
  onlyCity?: boolean
  setCoordinates?: ISetState<ICoordinate | null>
}

const AddressNoSalonField: FC<IAddressNoSalonFieldProps> = ({
  label = 'Адрес',
  fullWidth = true,
  salonId = null,
  view,
  onlyCity,
  setCoordinates,
  setClickCity,
  setClickAddress,
  ...rest
}) => {
  const [address, setAddres] = useState<ICoordinate | null>(null)
  const { suggestions, coordinates, loading } = useAddressSuggestions(
    rest.input.value,
    onlyCity,
  )

  useEffect(() => {
    setClickCity(coordinates?.city || null)
    if (setClickAddress) {
      setClickAddress(coordinates)
    }
    if (setCoordinates && coordinates?.geoLon && coordinates?.geoLat) {
      setAddres({
        longitude: coordinates?.geoLon || 0,
        latitude: coordinates?.geoLat || 0,
      })
      setCoordinates({
        longitude: coordinates?.geoLon || 0,
        latitude: coordinates?.geoLat || 0,
      })
    }
  }, [coordinates, setCoordinates, setClickCity, setClickAddress, setAddres])

  return (
    <AddressWrap noMap={!rest.noMap}>
      <AutosuggestFieldStyled
        {...rest}
        fullWidth={fullWidth}
        label={label}
        suggestions={suggestions}
        loading={loading}
      />
      {!rest.noMap && address ? (
        <MapWrap>
          <Map view={view} address={address} />
        </MapWrap>
      ) : null}
    </AddressWrap>
  )
}

export default AddressNoSalonField
