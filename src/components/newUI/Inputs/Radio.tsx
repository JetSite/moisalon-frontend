import React from 'react'
import { FormControlLabel, Radio } from '@material-ui/core'
import { FieldRenderProps } from 'react-final-form'

interface RadioButtonProps extends FieldRenderProps<string, HTMLElement> {
  color?: 'default' | 'primary' | 'secondary'
  label: string
  value: string
}

const RadioButton: React.FC<RadioButtonProps> = ({
  input,
  label,
  color = 'default',
  ...rest
}) => {
  return (
    <FormControlLabel
      control={<Radio {...input} color={color} />}
      label={label}
      {...rest}
    />
  )
}

export default RadioButton
