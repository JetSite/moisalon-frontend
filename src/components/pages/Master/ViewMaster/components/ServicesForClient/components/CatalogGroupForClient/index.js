import React, { useState } from 'react'
import styled from 'styled-components'
import CatalogSubGroup from '../CatalogSubGroup'

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

export function CatalogGroupForClient({ service, entriesItems }) {
  const [collapsed, setCollapsed] = useState(true)

  if (!service?.subGroups) {
    return null
  }

  const subGroups = group?.subGroups
    ?.map((subGroup, idx) => {
      if (
        entriesItems.find(item => item?.id === subGroup?.id) ||
        (subGroup?.items?.length &&
          entriesItems.find(item => {
            for (let i = 0; i < group?.subGroups?.items?.length; i++) {
              if (item?.id === group?.subGroups?.items[i]?.id) {
                return item
              }
            }
          }))
      ) {
        return (
          <CatalogSubGroup
            key={idx}
            subGroup={subGroup}
            entriesItems={entriesItems}
          />
        )
      } else {
        return null
      }
    })
    .filter(element => element !== null)

  if (subGroups?.length === 0) {
    return null
  }

  const visibleItems = subGroups?.slice(0, 3)
  const collapsedItems = subGroups?.slice(3)
  const collapsedText = collapsed ? 'Развернуть' : 'Скрыть'

  const handleChange = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Wrapper>
      <Title>{ucFirst(service?.serviceName)}</Title>
      <Item>{visibleItems}</Item>
      {!collapsed && <Item>{collapsedItems}</Item>}
      {subGroups?.length > 3 && (
        <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
      )}
    </Wrapper>
  )
}
