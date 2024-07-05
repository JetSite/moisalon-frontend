import styled from 'styled-components'
import { Field } from 'react-final-form'
import { laptopBreakpoint } from '../../../../../../../styles/variables'
import { FC } from 'react'

const Wrapper = styled.div`
  margin-bottom: 30px;
`

const Title = styled.p`
  margin-bottom: 15px;
  font-size: 16px;
  text-transform: uppercase;
`

const CheckboxWrapper = styled.div`
  margin-bottom: 15px;
`

const CheckboxElement = styled(Field)`
  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked {
    & + label::before {
      background: url('/tick-checkbox.png') no-repeat center;
    }
  }

  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  & + label::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #797979;
    margin-right: 14px;
    cursor: pointer;
    background: ${props =>
      props.checked ? `url("/tick-checkbox.png") no-repeat center` : ''};
  }
`

const Label = styled.label`
  cursor: pointer;
`
interface Props {
  item: any
}

const TechnicalBlock: FC<Props> = ({ item }) => {
  return (
    <Wrapper>
      <Title>{item.title}</Title>
      {item.id === 'equipment_lighting' ? (
        <CheckboxWrapper>
          <CheckboxElement
            name="hasWindows"
            component="input"
            type="checkbox"
            id="hasWindows"
          />
          <Label htmlFor="hasWindows">Наличие окон</Label>
        </CheckboxWrapper>
      ) : item.items.length ? (
        item.items.map(checkboxItem => (
          <CheckboxWrapper key={checkboxItem.id}>
            <CheckboxElement
              name={item.id}
              component="input"
              type="checkbox"
              value={checkboxItem.id}
              id={checkboxItem.id}
            />
            <Label htmlFor={checkboxItem.id}>{checkboxItem.title}</Label>
          </CheckboxWrapper>
        ))
      ) : null}
    </Wrapper>
  )
}

export default TechnicalBlock
