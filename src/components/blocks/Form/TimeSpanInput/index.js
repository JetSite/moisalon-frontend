import React, { useCallback } from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { FormGroup } from '@material-ui/core'
import FormHelperText from '@material-ui/core/FormHelperText'
import { Box } from '@material-ui/core'
import { Separator } from './styles'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'

const padWithZero = time => time.toString().padStart(2, '0')

const getTimeValueString = (hour, minute) =>
  `${padWithZero(hour)}:${padWithZero(minute)}`

const getTimeValue = input => {
  if (input === '' || !input) {
    return {
      hour: 0,
      minute: 0,
    }
  }

  const hourString = input.substring(0, 2)
  const minuteString = input.substring(3, 5)
  const hour = parseInt(hourString, 10)
  const minute = parseInt(minuteString, 10)

  const value = {
    hour,
    minute,
  }

  return value
}

const getTimeValueFromEvent = event => {
  const {
    target: { value },
  } = event
  return getTimeValue(value)
}

const FullTime = ({ isActive = false, onClick }) => {
  const color = isActive ? '#007AFF' : '#D8D8D8'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      viewBox="0 0 22 20"
      className="timeInput__fullTime"
      onClick={onClick}
    >
      <path
        fill={color}
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        d="M9.906 0c5.27 0 9.578 4.115 9.888 9.307h1.464a.723.723 0 01.571 1.166l-2.554 3.295a.723.723 0 01-1.143 0l-2.555-3.295a.723.723 0 01.572-1.166h1.567a7.833 7.833 0 10-2.756 6.583 1.037 1.037 0 111.338 1.583 9.869 9.869 0 01-6.392 2.339C4.435 19.812 0 15.377 0 9.906 0 4.435 4.435 0 9.906 0zm-2.49 6.94c.602 0 1.084.168 1.435.499.353.333.532.753.532 1.248 0 .275-.05.541-.149.791a3.15 3.15 0 01-.46.77c-.138.175-.378.42-.734.746a11.6 11.6 0 00-.644.618 2.437 2.437 0 00-.034.04h1.355a.667.667 0 010 1.332h-3a.43.43 0 01-.42-.534c.068-.276.18-.544.333-.798.218-.36.629-.818 1.257-1.401.6-.56.812-.802.883-.906.132-.198.199-.393.199-.58 0-.203-.05-.35-.15-.45-.101-.101-.242-.15-.43-.15-.186 0-.327.052-.432.158a.557.557 0 00-.12.21.706.706 0 01-.738.472.693.693 0 01-.52-.326.693.693 0 01-.053-.61c.115-.296.287-.532.51-.703.368-.282.833-.425 1.38-.425zm5.476 0c.238 0 .432.194.432.432v3.186h.069a.64.64 0 010 1.279h-.07v.46a.689.689 0 01-1.375 0v-.46h-1.902a.432.432 0 01-.432-.432v-.55c0-.12.036-.235.103-.334l2.318-3.392a.432.432 0 01.356-.188zm-.944 2.349l-.854 1.27h.854v-1.27z"
        transform="translate(-1258 -3033) translate(157 1496) translate(1 1512) translate(461 1) translate(460) translate(179 24)"
      />
    </svg>
  )
}

const InputLabelStyled = styled(InputLabel)`
  font-size: 1.4rem;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 1.2rem;
  }
`

const InputStyled = styled(Input)`
  font-size: 1.6rem;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 1.4rem;
  }
`

const TimeSpanInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  showError = false,
  errorText,
}) => {
  const handleNonStop = useCallback(() => {
    onChange({
      ...value,
      startHour: 0,
      startMinute: 0,
      endHour: 23,
      endMinute: 59,
    })
  }, [onChange, value])

  const handleOnChange = useCallback(
    event => {
      const timeValue = getTimeValueFromEvent(event)
      const name = event.target.name
      if (name.endsWith('from')) {
        onChange({
          ...value,
          startHour: timeValue.hour,
          startMinute: timeValue.minute,
        })
      } else {
        onChange({
          ...value,
          endHour: timeValue.hour,
          endMinute: timeValue.minute,
        })
      }
    },
    [onChange, value],
  )

  const fromValue = getTimeValueString(value.startHour, value.startMinute)
  const toValue = getTimeValueString(value.endHour, value.endMinute)

  const fromName = `${name}.from`
  const toName = `${name}.to`

  const isActive = fromValue === '00:00' && toValue === '23:59'

  return (
    <>
      <FormGroup error={showError} fullWidth={true}>
        <InputLabelStyled htmlFor={fromName}>{label}</InputLabelStyled>
        <Box mt={2}>
          <InputStyled
            value={fromValue}
            onChange={handleOnChange}
            onBlur={onBlur}
            name={fromName}
            inputComponent="input"
            type="time"
            inputProps={{
              inputMode: 'numeric',
            }}
          />
          <Separator>&ndash;</Separator>
          <InputStyled
            value={toValue}
            onChange={handleOnChange}
            onBlur={onBlur}
            name={toName}
            inputComponent="input"
            type="time"
            inputProps={{
              inputMode: 'numeric',
            }}
          />
          <FullTime isActive={isActive} onClick={handleNonStop} />
        </Box>
        {showError ? <FormHelperText>{errorText}</FormHelperText> : null}
      </FormGroup>
    </>
  )
}

export default TimeSpanInput
