import React, { useState } from 'react'
import styled from 'styled-components'
import CatalogSubGroup from '../CatalogSubGroup'
import CatalogItem from '../CatalogItem'

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
`

const Title = styled.h4`
  font-weight: 600;
  font-size: 26px;
  margin-bottom: 20px;
`

const ShowMore = styled.span`
  display: block;
  width: fit-content;
  margin-top: 10px;
  font-size: 14px;
  line-height: 27px;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #ff0033;
  }
`

const Item = styled.div``

const ucFirst = str => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}

export function CatalogGroupForClient({ serviceBlock, entriesItems }) {
  const [collapsed, setCollapsed] = useState(true)

  if (!serviceBlock?.services) {
    return null
  }

  const services = serviceBlock?.services?.map((service, idx) => {
    return <CatalogItem key={idx} item={service} />
  })

  if (services?.length === 0) {
    return null
  }

  const visibleItems = services?.slice(0, 3)
  const collapsedItems = services?.slice(3)
  const collapsedText = collapsed ? 'Развернуть' : 'Скрыть'

  const handleChange = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Wrapper>
      <Title>{ucFirst(serviceBlock?.category)}</Title>
      <Item>{visibleItems}</Item>
      {!collapsed && <Item>{collapsedItems}</Item>}
      {services?.length > 3 && (
        <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
      )}
    </Wrapper>
  )
}
