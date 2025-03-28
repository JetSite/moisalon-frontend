import { useState, useEffect } from 'react'
import styled from 'styled-components'
import CatalogItem from '../CatalogItem'

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const Title = styled.h4`
  font-weight: 500;
  font-size: 18px;
  width: 70%;
  flex-shrink: 0;
`

const Price = styled.p`
  font-weight: 400;
  font-size: 18px;
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

export default function CatalogSubGroup({ service, entriesItems }) {
  const [collapsed, setCollapsed] = useState(false)

  const mapped = subGroup?.items
    ?.map((service, idx) => {
      if (entriesItems.find(el => el?.id === service?.id)) {
        return (
          <CatalogItem entriesItems={entriesItems} key={idx} item={service} />
        )
      } else {
        return null
      }
    })
    .filter(element => element !== null)

  const visibleItems = mapped?.slice(0, 3)
  const collapsedItems = mapped?.slice(3)
  const collapsedText = collapsed ? 'Показать все' : 'Скрыть'

  const handleChange = () => {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    setCollapsed(true)
  }, [])

  return (
    <Wrapper>
      <Top>
        <Title>{ucFirst(subGroup?.title)}</Title>
        {item?.price ? <Price>от {item.price}</Price> : null}
      </Top>
      <Item>{visibleItems}</Item>
      {!collapsed && <Item>{collapsedItems}</Item>}
      {mapped?.length > 3 && (
        <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
      )}
    </Wrapper>
  )
}
