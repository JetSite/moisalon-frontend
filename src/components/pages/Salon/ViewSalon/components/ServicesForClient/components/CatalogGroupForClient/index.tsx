import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { CatalogSubGroup } from '../CatalogSubGroup'
import { IGroupedCategories } from 'src/utils/getGrupedServices'

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

const ucFirst = (str: string) => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}

interface Props {
  group: IGroupedCategories
  withPrice: boolean
}

export const CatalogGroupForClient: FC<Props> = ({ group, withPrice }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true)

  if (!group?.services) {
    return null
  }

  const subGroups = group.services
    ?.map((subGroup, idx) => {
      return <CatalogSubGroup key={idx} subGroup={subGroup} group={group} />
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
      <Title>{ucFirst(group?.title)}</Title>
      <Item>{visibleItems}</Item>
      {!collapsed && <Item>{collapsedItems}</Item>}
      {subGroups?.length > 3 && (
        <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
      )}
    </Wrapper>
  )
}
