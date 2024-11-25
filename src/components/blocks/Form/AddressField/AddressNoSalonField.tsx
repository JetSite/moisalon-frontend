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
  label: string
  noMap?: boolean
  view?: boolean
  setClickCity?: ISetState<string | null>
  setFullAddress?: ISetState<IAddressSuggestion | null>
  onlyCity?: boolean
  setCoordinates?: ISetState<ICoordinate | null>
  helperText?: string
  onlyFull?: boolean
}

const AddressNoSalonField: FC<IAddressNoSalonFieldProps> = ({
  label = 'Адрес',
  fullWidth = true,
  view,
  onlyCity,
  setCoordinates,
  setClickCity,
  setFullAddress,
  helperText,
  onlyFull,
  ...rest
}) => {
  const [mapCoordinate, setMapCoordinate] = useState<ICoordinate | null>(null)
  const [isError, setIsError] = useState(false)
  const { suggestions, fullAddress, loading } = useAddressSuggestions(
    rest.input.value,
    onlyCity,
  )

  useEffect(() => {
    if (!fullAddress) return
    setClickCity && setClickCity(fullAddress.city ?? null)

    if (onlyFull) {
      if (fullAddress.house) {
        setIsError(false)
        setFullAddress && setFullAddress(fullAddress)
      } else {
        setIsError(true)
      }
    } else {
      setFullAddress && setFullAddress(fullAddress)
    }

    if (
      setCoordinates &&
      typeof fullAddress.geoLon === 'number' &&
      typeof fullAddress.geoLat === 'number'
    ) {
      setMapCoordinate({
        longitude: fullAddress.geoLon,
        latitude: fullAddress.geoLat,
      })
      setCoordinates({
        longitude: fullAddress.geoLon,
        latitude: fullAddress.geoLat,
      })
    }
  }, [fullAddress, setCoordinates, setClickCity, setFullAddress])

  return (
    <AddressWrap noMap={!rest.noMap}>
      <AutosuggestFieldStyled
        {...rest}
        fullWidth={fullWidth}
        label={label}
        suggestions={suggestions}
        loading={loading}
        meta={{ ...rest.meta, error: isError }}
        helperText={helperText}
      />
      {!rest.noMap && mapCoordinate ? (
        <MapWrap>
          <Map view={view} address={mapCoordinate} />
        </MapWrap>
      ) : null}
    </AddressWrap>
  )
}

export default AddressNoSalonField
