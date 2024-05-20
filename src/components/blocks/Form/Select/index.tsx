import React, { useCallback, forwardRef, useEffect } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import MuiSelect from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import { SelectProps as MuiSelectProps } from '@material-ui/core/Select'
import { FieldRenderProps } from 'react-final-form'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

export interface ISelectProps
  extends Omit<MuiSelectProps, 'onChange'>,
    Omit<FieldRenderProps<any, HTMLElement, any>, 'input' | 'meta'> {
  showError: boolean
  options: { value: string; label: string }[]
  errorText?: string
}

const MenuItemStyled = styled(MenuItem)`
  display: block;
  padding: 5px 10px;
  font-size: 16px;
`

export const useStyles = makeStyles<Theme, { color?: string }>({
  root: ({ color }) => ({
    fontSize: '1.6rem',
    color,
    '& &:before': {
      borderBottomColor: color,
    },
    '& &:hover:before': {
      borderBottomColor: color,
    },
    '& &:after': {
      borderBottomColor: color,
    },
    '& &$focused': {
      color,
    },
  }),
  input: ({ color }) => ({
    color,
  }),
  icon: ({ color }) => ({
    color,
  }),
  focused: mode => ({ fontSize: '1.6rem' }),
})

const Select = forwardRef<HTMLDivElement, ISelectProps>((props, ref) => {
  const {
    onChange,
    value,
    showError,
    label,
    options,
    errorText,
    name,
    color,
    ...rest
  } = props

  const optionsList = options.map(option => (
    <MenuItemStyled value={option.value} key={option.value}>
      {option.label}
    </MenuItemStyled>
  ))

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>,
    ) => {
      if (value !== event.target.value) {
        onChange(event)
      }
    },
    [value, onChange],
  )
  const classes = useStyles({ color })

  return (
    <FormControl
      style={{ fontSize: '1.6rem' }}
      error={showError}
      fullWidth={true}
      classes={{
        root: classes.root,
      }}
    >
      <InputLabel
        htmlFor={name}
        style={{ fontSize: '1.6rem' }}
        classes={{
          root: classes.root,
          focused: classes.focused,
        }}
      >
        {label}
      </InputLabel>
      <MuiSelect
        style={{ fontSize: '1.6rem' }}
        // IconComponent={(props) => (
        //   <ExpandMoreIcon className={`${props.className}`} />
        // )}
        inputRef={ref}
        value={value}
        onChange={handleChange}
        classes={{
          root: classes.root,
          icon: classes.icon,
        }}
        input={
          <Input
            classes={{ root: classes.root }}
            style={{ fontSize: '1.6rem' }}
            name={name}
          />
        }
        error={showError}
        {...rest}
      >
        {optionsList}
      </MuiSelect>
      {showError ? <FormHelperText>{errorText}</FormHelperText> : null}
    </FormControl>
  )
})

export default Select
