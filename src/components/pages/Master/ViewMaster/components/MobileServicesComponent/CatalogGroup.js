import React, { useState } from 'react'
import styled from 'styled-components'
import { CatalogItem } from './CatalogItem'
import { laptopBreakpoint } from '../../../../../../styles/variables'

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

const TickIcon = styled.div`
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

const ItemWrapper = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  margin-bottom: ${({ open }) => (open ? '40px' : '0')};
`

export function CatalogGroup({ group, entries }) {
  const [openGroup, setOpenGroup] = useState(false)

  if (group.items === undefined) {
    return null
  }

  const items = group.items
    .filter(item => entries.find(entry => entry.id === item.id))
    .map(item => <CatalogItem key={item.id} item={item} />)

  if (items.length === 0) {
    return null
  }

  const openGroupHandler = () => {
    setOpenGroup(!openGroup)
  }

  return (
    <Wrapper>
      <TitleWrapper onClick={openGroupHandler}>
        <Title>{group.title}</Title>
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
