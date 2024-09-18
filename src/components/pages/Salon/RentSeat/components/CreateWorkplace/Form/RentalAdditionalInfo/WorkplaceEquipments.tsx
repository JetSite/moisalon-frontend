import { FC } from 'react'
import styled from 'styled-components'
import { Desc } from '../../styles'
import { IGroupedCategories } from 'src/utils/getGrupedServices'
import { CheckboxElement, Label, CheckboxWrapper } from './styles'

const Wrapper = styled.li`
  margin-bottom: 30px;
`

const Title = styled.h4`
  font-weight: 400;
  margin-bottom: 15px;
  font-size: 16px;
  text-transform: uppercase;
`

interface Props {
  groupedEquipments: IGroupedCategories[]
}

export const WorkplaceEquipments: FC<Props> = ({ groupedEquipments }) => {
  return (
    <>
      <Desc>Оборудование</Desc>
      <ul>
        <Title>Удобства</Title>
        <CheckboxWrapper>
          <CheckboxElement
            name="hasWindows"
            component="input"
            type="checkbox"
            id="hasWindows"
          />
          <Label htmlFor="hasWindows">Наличие окон</Label>
        </CheckboxWrapper>
      </ul>
      <ul>
        {groupedEquipments.map(item => (
          <Wrapper key={item.id}>
            <Title>{item.title}</Title>
            <ul>
              {item.services.map(checkboxItem => (
                <CheckboxWrapper key={checkboxItem.id}>
                  <CheckboxElement
                    name="equipment"
                    component="input"
                    type="checkbox"
                    value={checkboxItem.id}
                    id={checkboxItem.id}
                  />
                  <Label htmlFor={checkboxItem.id}>{checkboxItem.title}</Label>
                </CheckboxWrapper>
              ))}
            </ul>
          </Wrapper>
        ))}
      </ul>
    </>
  )
}
