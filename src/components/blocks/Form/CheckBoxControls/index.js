import React, { forwardRef } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const CheckBoxFieldAdapter = forwardRef(({ input, label }, ref) => {
  return (
    <FormControlLabel
      control={<Checkbox inputRef={ref} {...input} />}
      label={label}
    />
  )
})

CheckBoxFieldAdapter.displayName = 'CheckBoxFieldAdapter'
export default CheckBoxFieldAdapter
