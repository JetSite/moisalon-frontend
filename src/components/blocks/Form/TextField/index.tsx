import React, { FunctionComponent, forwardRef } from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import { FieldInputProps, FieldMetaState } from 'react-final-form'
import { SelectProps } from '@material-ui/core'

const TextFieldStyled = styled(TextField)`
  .MuiInputBase-input {
    font-size: 16px;
    line-height: 1.4;
  }
  .MuiFormLabel-root {
    font-size: 14px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    .MuiInputBase-input {
      font-size: 14px;
      font-weight: 500;
      line-height: 25px;
    }
    .MuiFormLabel-root {
      padding-bottom: 10px;
      font-size: 14px;
      font-weight: 500;
      line-height: 12px;
    }
  }
`

interface Props extends Omit<TextFieldProps, 'input'> {
  input: FieldInputProps<any, HTMLElement>
  meta: FieldMetaState<any>
  maxLength?: number | string
}

const TextFieldAdapter = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    input,
    meta,
    fullWidth = true,
    maxLength = '99',
    inputMode,
    color = '',
    ...rest
  } = props
  const showError =
    ((meta?.submitError && !meta?.dirtySinceLastSubmit) || meta?.error) &&
    meta?.touched
  let { value, type, ...inputRest } = input
  if (type === 'number') {
    if (value === 0) {
      value = ''
    }
    if (value < 0) {
      value = 0
    }
    // type = "text";
  }

  return (
    <TextFieldStyled
      inputRef={ref}
      fullWidth={fullWidth}
      InputLabelProps={{ shrink: type === 'date' || undefined }}
      value={value}
      type={type}
      {...rest}
      inputProps={{
        maxLength,
        inputMode,
        ...inputRest,
      }}
      error={showError}
      helperText={showError ? meta.error || meta.submitError : undefined}
    />
  )
})

export default TextFieldAdapter
