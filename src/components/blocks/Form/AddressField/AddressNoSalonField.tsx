import AutosuggestField from './AutosuggestField'
import {
  IAddressSuggestion,
  useAddressSuggestions,
} from './useAddressSuggestions'
import Map from '../../Map'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import { FC, useEffect, useState } from 'react'
import { TextFieldProps } from '@material-ui/core'
import {
  FieldInputProps,
  FieldMetaState,
  FieldRenderProps,
} from 'react-final-form'
import { ISetState } from 'src/types/common'
import { ICity } from 'src/types'

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
  extends Pick<FieldRenderProps<any, HTMLElement>, 'input' | 'meta'> {
  fullWidth?: boolean
  salonId?: string | null
  label: string
  noMap?: boolean
  view?: boolean
  setClickCity: ISetState<string | null>
  setClickAddress?: ISetState<IAddressSuggestion | null>
  onlyCity?: boolean
}

const AddressNoSalonField: FC<IAddressNoSalonFieldProps> = ({
  label = 'Адрес',
  fullWidth = true,
  salonId = null,
  view,
  onlyCity,
  ...rest
}) => {
  const { suggestions, coordinates, loading } = useAddressSuggestions(
    rest.input.value,
    onlyCity,
  )
  const address = {
    longitude: coordinates?.geoLon,
    latitude: coordinates?.geoLat,
  }

  useEffect(() => {
    rest.setClickCity(coordinates?.city || null)
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
        loading={loading}
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
