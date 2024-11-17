import { Checkbox, CheckboxProps } from '@material-ui/core'
import { FC } from 'react'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-left: -9px;
  margin-right: 25px;
`
export const Label = styled.label`
  font-size: 10px;
`
export const BpIcon = styled.span`
  border-radius: 3px;
  width: 23px;
  height: 23px;
  background-color: #e3e3e3;
  border: 1px solid #e3e3e3;

  &:hover {
    background-color: transparent;
  }

  input:hover ~ & {
    background-color: #ebf1f5;
  }
`

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#E3E3E3',
  border: '1px solid #E3E3E3',
  '&:before': {
    display: 'block',
    width: 23,
    height: 19,
    background: 'url(/icon-check.svg) no-repeat center',
    content: '""',
  },
})

interface Props extends CheckboxProps {
  label?: string
}

const CheckboxStyled: FC<Props> = ({ id, label, checked, ...props }) => {
  return (
    <Wrapper>
      <Checkbox
        id={id}
        icon={<BpIcon />}
        checkedIcon={<BpCheckedIcon />}
        checked={checked}
        {...props}
      />
      {label ? <Label htmlFor={id}>{label}</Label> : null}
    </Wrapper>
  )
}

export default CheckboxStyled
