import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import { CatalogItem } from '../CatalogItem'
import { IGroupedCategories } from 'src/utils/getGrupedServices'

const Wrapper = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

const Title = styled.h4`
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;
  }
`

const Item = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const TickIcon = styled.div<{ open: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11px;
  height: 11px;
  transform: ${({ open }) => (open ? 'rotate(90deg) translateX(-2px)' : '')};
  transition: all 0.2s;
`

const Icon = styled.img`
  width: 100%;
`

const ItemWrapper = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  margin-bottom: ${({ open }) => (open ? '40px' : '0')};
`

interface Porps {
  withPrice?: boolean
  services: IGroupedCategories[]
  group: IGroupedCategories
}

export const CatalogGroup: FC<Porps> = ({ group, withPrice = false }) => {
  const [openGroup, setOpenGroup] = useState<boolean>(false)

  const items = group.services.map(item => (
    <CatalogItem withPrice={withPrice} key={item.id} item={item} />
  ))

  if (items.length === 0) {
    return null
  }

  const openGroupHandler = () => {
    setOpenGroup(!openGroup)
  }

  return (
    <Wrapper>
      <TitleWrapper onClick={openGroupHandler}>
        <Title>{group.serviceCategoryName}</Title>
        <TickIcon open={openGroup}>
          <Icon src="/services-tick.svg" />
        </TickIcon>
      </TitleWrapper>
      <ItemWrapper open={openGroup}>
        <Item>{items}</Item>
      </ItemWrapper>
    </Wrapper>
  )
}
