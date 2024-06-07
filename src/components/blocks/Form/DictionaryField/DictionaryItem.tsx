import styled from 'styled-components'
import { FC, useCallback } from 'react'
import { laptopBreakpoint } from '../../../../styles/variables'
import { FieldArrayRenderProps } from 'react-final-form-arrays'

const Input = styled.input<{ check?: boolean }>`
  margin: 5px;
  background: ${props => (!props.check ? '#fff' : '#f03')};
  border: ${props => (!props.check ? '1px solid #000000' : '1px solid #f03')};
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  outline: none;
  padding: 9px 55px;
  color: ${props => (!props.check ? '#000' : '#fff')};

  @media (max-width: ${laptopBreakpoint}) {
    padding: 6px 23px;
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`

interface Props
  extends Pick<FieldArrayRenderProps<any, HTMLElement>, 'fields'> {
  name?: string
  onlyOneChoose: boolean
  item: any
}

const DictionaryItem: FC<Props> = ({ item, fields, name, onlyOneChoose }) => {
  const { id, checked, label } = item
  const onClick = useCallback(() => {
    if (onlyOneChoose) {
      fields.pop()
      fields.push(id)
      return
    }
    if (checked) {
      const { value = [] } = fields
      const index = value.indexOf(id)
      if (index > -1) {
        fields.remove(index)
      }
    } else {
      fields.push(id)
    }
  }, [id, fields, checked])

  return (
    <Input
      check={checked}
      onClick={onClick}
      type="button"
      value={label}
      name={name}
    />
  )
}

export default DictionaryItem
