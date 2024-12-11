import AutosuggestField from './AutosuggestField'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import { FC, useEffect } from 'react'
import { FieldRenderProps } from 'react-final-form'
import { ISetState } from 'src/types/common'
import { useCountrySuggestions } from './useCountrySuggestions'

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

const CountryWrap = styled.div`
  position: relative;
  width: 100%;
`

export interface IAddressNoSalonFieldProps
  extends Pick<FieldRenderProps<any, HTMLElement>, 'input' | 'meta'> {
  fullWidth?: boolean
  label: string
  setSelectCountry: ISetState<string | null>
}

const CountryField: FC<IAddressNoSalonFieldProps> = ({
  label = 'Страна',
  fullWidth = true,
  ...rest
}) => {
  const { suggestions, coordinates, loading } = useCountrySuggestions(
    rest.input.value,
  )

  useEffect(() => {
    rest.setSelectCountry(coordinates?.value || null)
  }, [coordinates])

  return (
    <CountryWrap>
      <AutosuggestFieldStyled
        {...rest}
        fullWidth={fullWidth}
        label={label}
        suggestions={suggestions}
        loading={loading}
      />
    </CountryWrap>
  )
}

export default CountryField
