import React from 'react'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import { IGroupedService } from 'src/utils/getGrupedServices'

const Wrapper = styled.div``

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-right: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`

const Price = styled.p`
  font-size: 18px;
  line-height: 30px;
  flex-shrink: 0;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`

export const CatalogItem = ({
  item,
  withPrice,
}: {
  item: IGroupedService
  withPrice?: boolean
}) => {
  return (
    <Wrapper>
      <Content>
        <Title>{item.title}</Title>
        {withPrice ? <Price>от 10 000</Price> : null}
      </Content>
    </Wrapper>
  )
}
